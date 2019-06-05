package com.unifun.voice.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.unifun.voice.cdi.TokenResponse;
import com.unifun.voice.cdi.User;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.*;

@Path("/login")
public class LoginUser {
    private static Map<String,String> refreshTokens = new HashMap<>();

    private String SecretKey = genRefreshToken();

    public static Map<String,String> getRefreshTokenInstance() {
        if(refreshTokens == null) {
            refreshTokens =  new HashMap<String, String>();
        }
        return refreshTokens;
    }

    @POST
    public String getUserData(String req){
        User user = validateUserLdap(req);
        if (user != null) {
            return genToken(req);
        }
        return "notok";
    }



    public User validateUserLdap (String reqBody) {
        Jsonb jsonb = JsonbBuilder.create();
        User user = jsonb.fromJson(reqBody, User.class);
        String username = user.getUsername();
        String password = user.getPassword();

        try {
            Hashtable<String, String> env = new Hashtable<String, String>();
            env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
            env.put(Context.PROVIDER_URL, "ldap://localhost:389");
            env.put(Context.SECURITY_AUTHENTICATION, "simple");
            env.put(Context.SECURITY_PRINCIPAL, "cn=" + username + ",dc=unifun,dc=in");
            env.put(Context.SECURITY_CREDENTIALS, password);
            DirContext ctx = new InitialDirContext(env);
            ctx.close();

            return user;
        } catch (Exception e) {
            return null;
        }
    }

    private String genToken(String reqBody){
        Jsonb jsonb = JsonbBuilder.create();
        User user = jsonb.fromJson(reqBody, User.class);
        String username = user.getUsername();
        try {
            Algorithm algorithmHS = Algorithm.HMAC256(SecretKey);
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("userID", username )
                    .withExpiresAt(new Date(System.currentTimeMillis()+(10*60*1000)))
                    .sign(algorithmHS);
            String refreshToken = genRefreshToken();

            refreshTokens.put(user.getUsername(),refreshToken);
            TokenResponse tokenResponse = new TokenResponse();
            tokenResponse.setJwt(token);
            tokenResponse.setRefreshToken(refreshToken);
            Jsonb jsonb1 = JsonbBuilder.create();
            return jsonb1.toJson(tokenResponse);
        } catch (JWTCreationException exception){
            return "invalid token";
        }
    }

    private String genRefreshToken(){
        String resultUUID = UUID.randomUUID().toString().replace("-", "");
        resultUUID += UUID.randomUUID().toString().replace("-", "");
        resultUUID += UUID.randomUUID().toString().replace("-", "");

        return resultUUID;
    }



}

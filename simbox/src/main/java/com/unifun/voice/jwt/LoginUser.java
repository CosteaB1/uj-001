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
import java.util.Date;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Path("/login")
public class LoginUser {
	private static Map<String, String> refreshTokens = new HashMap<>();

	private String SecretKey = "veryverysecretkey123";

	public static Map<String, String> getRefreshTokenInstance() {
		if (refreshTokens == null) {
			refreshTokens = new HashMap<String, String>();
		}
		return refreshTokens;
	}

	@POST
	public String getUserData(String req) throws SQLException {
		User user = validateUserLdap(req);
		LoginSession(req);
		if (user != null) {
			return genToken(req);
		}
		return "notok";
	}

//      VERIFICATION WITH LDAP SERVER FOR LOGIN         -------->>>>>>>>>
	public User validateUserLdap(String reqBody) {
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
			
//			System.out.println("user:" + user);
			return user;
		} 
		catch (Exception e) {
			return null;
		}
	}

//    LOGIN SEESION ---------->

	public  void  LoginSession(String reqBody)  throws SQLException{
		Jsonb jsonb = JsonbBuilder.create();
		User user = jsonb.fromJson(reqBody, User.class);
		String username = user.getUsername();

		User myLocalVar = validateUserLdap(reqBody);


		Connection myConn = null;
		Statement myStmt = null;

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		String datat = dtf.format(now);

		try {
			
			if (myLocalVar !=null) {
			
			
			// 1. Get a connection to database
			myConn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "1234");

			// 2. Create a statement
			myStmt = myConn.createStatement();

			// 3. Execute SQL query
			String sql = "insert into logs " + " (name, datelog)" + " values ('" + username + "','" + datat + "')";

			myStmt.executeUpdate(sql);

			System.out.println("Insert complete.");
		}	
		}
		catch (Exception exc) {
			exc.printStackTrace();
		} finally {
			if (myStmt != null) {
				myStmt.close();
			}

			if (myConn != null) {
				myConn.close();
			}
		}

	}

	private String genToken(String reqBody) {
		Jsonb jsonb = JsonbBuilder.create();
		User user = jsonb.fromJson(reqBody, User.class);
		String username = user.getUsername();
		try {
			Algorithm algorithmHS = Algorithm.HMAC256(SecretKey);
			String token = JWT.create().withIssuer("auth0").withClaim("userID", username)
					.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 1000))).sign(algorithmHS);
			String refreshToken = genRefreshToken();

			refreshTokens.put(user.getUsername(), refreshToken);
			TokenResponse tokenResponse = new TokenResponse();
			tokenResponse.setJwt(token);
			tokenResponse.setRefreshToken(refreshToken);
			Jsonb jsonb1 = JsonbBuilder.create();
			return jsonb1.toJson(tokenResponse);
		} catch (JWTCreationException exception) {
			return "invalid token";
		}
	}

	private String genRefreshToken() {
		try {
			Algorithm algorithmHS = Algorithm.HMAC256(SecretKey);
			String refreshToken = JWT.create().withIssuer("auth0").withClaim("userID", "text")
					.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 1000))).sign(algorithmHS);
			return refreshToken;
		} catch (JWTCreationException exception) {
			return "invalid refresh token";
		}
	}

}
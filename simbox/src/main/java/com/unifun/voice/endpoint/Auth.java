//package com.unifun.voice.endpoint;
//
//import java.util.Base64;
///*import java.util.Base64;
//*/
//import java.util.Hashtable;
//import java.util.StringJoiner;
//
//
//
//import javax.json.bind.JsonbBuilder;
//import javax.naming.Context;
//import javax.naming.directory.DirContext;
//import javax.naming.directory.InitialDirContext;
//import javax.ws.rs.POST;
//import javax.ws.rs.Path;
//
//import org.jboss.logging.Logger;
//
//
//@Path("/auth")
//public class Auth {
//	private static final Logger logger = Logger.getLogger(Auth.class);
//	private String json_field = "\"%s\":\"%s\"";
//	@POST
//	public String getPost(String reqBody) {
//		
//		logger.info(reqBody);
//		reqBody = reqBody.substring(9,reqBody.length()-2);
//		byte[] decodedBytes = Base64.getDecoder().decode(reqBody);
//		reqBody = new String(decodedBytes);		
//		int sep=reqBody.indexOf(":");
//		String username = reqBody.substring(0,sep);
//		String password = reqBody.substring(sep+1);
//
//		System.out.println("username: "+username);
//		System.out.println("password: "+password);	
//		
//		
//		//TODO check if user and password is ok 
///*		StringJoiner sj = new StringJoiner(",","{","}");
//		sj.add(String.format(json_field, "status","ok"));
//		sj.add(String.format(json_field, "token","123"));
//		return JsonbBuilder.create().toJson(sj.toString());*/
//		
//		try {		
//			Hashtable<String, String> env = new Hashtable<String, String>();
//			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
//			env.put(Context.PROVIDER_URL,"ldap://localhost:389");
//			env.put(Context.SECURITY_AUTHENTICATION, "simple");
//			env.put(Context.SECURITY_PRINCIPAL,"cn="+username+",dc=unifun,dc=in");
//			env.put(Context.SECURITY_CREDENTIALS,password);
//			DirContext ctx = new InitialDirContext(env);
//			ctx.close();
//			
//			StringJoiner sj = new StringJoiner(",","{","}");
//			sj.add(String.format(json_field, "status","ok"));
//			sj.add(String.format(json_field, "token",username));
//			return JsonbBuilder.create().toJson(sj.toString());
//		}
//		catch(Exception e) {
//			StringJoiner sj = new StringJoiner(",","{","}");
//			sj.add(String.format(json_field, "status","notok"));
//			return JsonbBuilder.create().toJson(sj.toString());
//		}
//
// 
//		
//	}
//
//}
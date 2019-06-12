package com.unifun.voice.jwt;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.sql.*;


@Path("/logout")
public class LogoutUser {
  

    @POST
    public Response logoutUser(String req) throws SQLException {
    	  Connection myConn = null;
    		Statement myStmt = null;
    		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    		LocalDateTime now = LocalDateTime.now();
    		String datat = dtf.format(now);
    		   System.out.println(req.toString());
    			int sep=req.indexOf(":");
    			String usernameLogout = req.substring(sep+2,req.length()-2);
    		try {
    			// 1. Get a connection to database
    			myConn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "1234");

    			// 2. Create a statement
    			myStmt = myConn.createStatement();

    			// 3. Execute SQL query
    			String sql = "insert into logs " + " (name,Session, datelog)" + " values ('" + usernameLogout + "','Logout','" + datat + "')";

    			myStmt.executeUpdate(sql);

    			System.out.println("Insert complete.");
    		
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
    		
    		
    		
     

        String token = "";
        if(LoginUser.getRefreshTokenInstance().containsValue(token)){
            LoginUser.getRefreshTokenInstance().entrySet()
                    .removeIf(
                            entry -> (token
                            .equals(entry.getValue())));
        }
        return Response.status(Response.Status.NO_CONTENT).entity("Logout").build();
    
    

	

	
	

    
  
    }}
    


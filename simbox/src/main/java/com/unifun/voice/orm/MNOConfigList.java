package com.unifun.voice.orm;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="MnoConfig")
public class MNOConfigList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	int mno_id;
	String URI;
	String wsServer;
	String authUser;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMno_id() {
		return mno_id;
	}
	public void setMno_id(int mno_id) {
		this.mno_id = mno_id;
	}
	public String getURI() {
		return URI;
	}
	public void setURI(String uRI) {
		URI = uRI;
	}
	public String getWsServer() {
		return wsServer;
	}
	public void setWsServer(String wsServer) {
		this.wsServer = wsServer;
	}
	public String getAuthUser() {
		return authUser;
	}
	public void setAuthUser(String authUser) {
		this.authUser = authUser;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	String password;
	
}

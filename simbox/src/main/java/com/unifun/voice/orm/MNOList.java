package com.unifun.voice.orm;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="MNO")
@NamedQuery(name="MNOList.getAll",query="select t from MNOList t WHERE simbox_id = 1")


public class MNOList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	int simbox_id;
	String URI;
	String wsServer;
	String authUser;
	String pass;
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
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}

	public int getSimbox_id() {
		return simbox_id;
	}
	public void setSimbox_id(int simbox_id) {
		this.simbox_id = simbox_id;
	}
	String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}

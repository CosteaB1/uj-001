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

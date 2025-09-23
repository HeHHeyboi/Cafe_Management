package com.CafeManagement.admin;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Entity
@Table(name="admin")
public class Admin {
  @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable=false,length=200) 
	private String name;
	
	@Column(nullable=false,unique=true) 
	private String email;
	
	// Constructors
	public Admin() {}
	public Admin(String name,String email) {
		this.name = name;
		this.email = email;
	}
	
	// getter
	public long getId() {
		return this.id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}

	// setter
	public void setId(long id) {
		this.id = id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String toString() {
		return id + ":" + name;
	}

}


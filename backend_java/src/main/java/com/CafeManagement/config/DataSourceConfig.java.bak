package com.CafeManagement.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DataSourceConfig {
	@Bean
	public DataSource sqliteSource() {
		HikariDataSource hd = new HikariDataSource();
		hd.setJdbcUrl("jdbc:sqlite:main.db");
		hd.setDriverClassName("org.sqlite.JDBC");
		hd.setConnectionInitSql("pragma foreign_keys = ON;");
		return hd;
	}
}

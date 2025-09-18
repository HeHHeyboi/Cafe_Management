package com.CafeManagement;

import com.CafeManagement.config.EnvConfig;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class CafeManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeManagementApplication.class, args);
		var context = new AnnotationConfigApplicationContext(EnvConfig.class);

		try (Connection connection = DriverManager.getConnection("jdbc:sqlite:main.db")) {
			SetupDatatBase(connection, context);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void SetupDatatBase(Connection conn, AnnotationConfigApplicationContext context) {
		String id = (String)context.getBean("admin_id");
		String email = (String)context.getBean("admin_email");
		String password = (String)context.getBean("admin_password");
		try {
			PreparedStatement statement = conn.prepareStatement("""
			INSERT INTO users (user_id, FName, LName, email, password, role)
			VALUES (?, ?, ?, ?, ?, 'admin')
			ON CONFLICT(email) DO NOTHING;
			""");
			statement.setString(1, id);
			statement.setString(2, "admin");
			statement.setString(3, "admin");
			statement.setString(4, email);
			statement.setString(5, password);
			statement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

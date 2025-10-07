package com.CafeManagement.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.exception.UserNotFoundException;
import com.CafeManagement.model.User;

@Repository
@Primary
public class SqliteUserRepo implements UserRepo {
	// NOTE: ถ้าจะทำ r epo clase ต้องมีตัวนี้ทุกครั้ง
	@Autowired
	JdbcTemplate jdbc;

	/*
	 * NOTE:
	 * เป็น SQL Script จาก backend_go/internal/database/user.sql.go
	 * Code ทัั้งหมดที่เกี่ยวข้องกับ Data Base อยู่ที่
	 * backend_go/go/internal/database
	 */
	private final String createUser = """
			INSERT INTO users(user_id, FName, LName, email, password,role)
			VALUES(?, ?, ?, ?, ?,?)
			""";

	public void CreateUser(CreateUserParams param) throws Exception {
		jdbc.update(createUser, param.userId, param.firstName, param.lastName,
				param.email, param.password, param.role);
	}

	/*
	 * NOTE:
	 * jdbc.update() ใช้สำหรับคำสั่งที่ไม่ต้องการ return ที่ส่งผลต่อข้อมูลใน Data
	 * Base เช่น
	 * INSERT, DELETE, UPDATE
	 * jdbc.query() ใช้สำหรับคำสั่งที่ต้องการ return ค่า เช่น
	 * SELECT
	 */
	private final String deleteAllUser = """
			DELETE from users
			WHERE role != 'admin'
			""";

	public void DeleteAllUser() throws Exception {
		jdbc.update(deleteAllUser);
	}

	private final String getAllUser = """
			SELECT user_id, fname, lname, email, password from users
			""";

	// NOTE:
	// ใช้ jdbc.query สำหรับ query ที่มี Column มากกว่า 1 col แลละมีข้อมูลมากกว่า 1
	// ตัว
	public List<User> GetAllUser() throws Exception {
		List<User> data = jdbc.query(getAllUser, new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				User user = new User();
				/*
				 * NOTE:
				 * การเอาข้อมูลจาก ResultSet มีสองแบบ Ex.
				 * 1. getString('1'); '1' หมายเลข column (หมายเลข column เริ่มที่ 1 เสมอ)
				 * 2. getString("user_id") "user_id" ชื่อของ column (ชื่อ column
				 * เป็นตัวพิมพ์เล็ก-ใหญ่ ได้หมด)
				 */
				user.setUserId(UUID.fromString(rs.getString(1)));
				user.setFirstName(rs.getString(2));
				user.setLastName(rs.getString(3));
				user.setEmail(rs.getString(4));
				user.setPassword(rs.getString(5));
				return user;
			}
		});
		return data;
	}

	private final String getUserByEmail = """
			select user_id, fname, lname, email, password, role from users
			WHERE email = ?
			""";

	/*
	 * NOTE:
	 * การ Query ด้วย value จาก Code ทำเหมือน format String
	 * จากใน getUserByEmail มีีสัญลักษณ์คือ ?
	 * เพื่อบอกให้ใส่ value ตำแหน่งนี้โดยค่าที่ต้องการเอาเข้าจะต้องเรียงตามลำดับ
	 * เช่น "select * from users where email = ? and password = ?", email, password
	 * จะใส่ email ตำแหน่ง ? ตัวแรก และ password ตำแหน่ง ? ตัวที่สอง
	 */
	public User GetUserByEmail(String email) throws Exception {
		SqlRowSet data = jdbc.queryForRowSet(getUserByEmail, email);
		User user = new User();
		if (data.next()) {
			user.setUserId(UUID.fromString(data.getString("user_id")));
			user.setFirstName(data.getString("fname"));
			user.setLastName(data.getString("lname"));
			user.setEmail(data.getString("email"));
			user.setPassword(data.getString("password"));
		} else {
			throw new UserNotFoundException("Can't find User with email: " + email);
		}
		return user;
	}

	private final String getUserByID = """
			select user_id, fname, lname, email, password, role from users
			Where user_id = ?
			""";

	public User GetUserById(String id) throws Exception {
		SqlRowSet data = jdbc.queryForRowSet(getUserByID, id);
		User user = new User();
		if (data.next()) {
			user.setUserId(UUID.fromString(data.getString(1)));
			user.setFirstName(data.getString("fname"));
			user.setLastName(data.getString("lname"));
			user.setEmail(data.getString("email"));
		} else {
			throw new UserNotFoundException("Can't find User with id:" + id);
		}
		return user;
	}

	private final String deleteUserById = """
			DELETE from users
			WHERE user_id = ?
			""";

	public void DeleteUserById(String id) {
		jdbc.update(deleteUserById, id);
	}

}

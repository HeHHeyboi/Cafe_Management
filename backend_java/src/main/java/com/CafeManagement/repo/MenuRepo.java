package com.CafeManagement.repo;

import java.sql.PreparedStatement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.dto.Type;

@Repository
public class MenuRepo {
	@Autowired
	JdbcTemplate jdbc;

	// final String createMenu = """
	// INSERT INTO menu(name,price,menu_type,img_url,size)
	// VALUES(?,?,?,?,?)
	// RETURNING menu_id;
	// """;
	final String createMenu = """
			INSERT INTO menu(name,price,menu_type,img_url,size)
			VALUES(?,?,?,?,?)
			""";

	final String createType = """
			INSERT INTO type_table(menu_id, type, addition_price)
			VALUES(?,?,?)
			""";

	public void CreateMenu(MenuRequest arg, String img_url) throws Exception {
		int id;
		int i = 0;
		KeyHolder key = new GeneratedKeyHolder();
		for (var c : arg.getCategory()) {
			// NOTE: Can use this like Golang
			// SqlRowSet row = jdbc.queryForRowSet(createMenu, arg.getName(), c.getPrice(),
			// arg.getMenu_type(), null,
			// c.getSize());
			// if (row.next()) {
			// id = row.getInt("menu_id");
			// Type t = arg.getTypes().get(i);
			// jdbc.update(createType, id, t.getType(), t.getAddition_price());
			// } else {
			// throw new RuntimeException("Can't Get id from createMenu query");
			// }

			jdbc.update(conn -> {
				PreparedStatement ps = conn.prepareStatement(createMenu, new String[] { "menu_id" });

				ps.setString(1, arg.getName());
				ps.setString(2, c.getPrice().toString());
				ps.setString(3, arg.getMenu_type());
				ps.setString(4, null);
				ps.setString(5, c.getSize());

				return ps;
			}, key);

			if (key.getKey() == null) {
				throw new RuntimeException("Can't get menu_id from createMenu");
			}
			id = key.getKey().intValue();
			Type t = arg.getTypes().get(i);
			jdbc.update(createType, id, t.getType(), t.getAddition_price());
		}
	}
}

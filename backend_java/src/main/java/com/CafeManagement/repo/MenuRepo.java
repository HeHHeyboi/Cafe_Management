package com.CafeManagement.repo;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.dto.Type;
import com.CafeManagement.exception.MenuNotFoundExeception;
import com.CafeManagement.model.Menu;

@Repository
public class MenuRepo {
	@Autowired
	JdbcTemplate jdbc;

	final String getMenus = """
			SELECT menu_id,name,price,menu_type,img_url,size FROM menu;
			""";

	final String getTypesById = """
				SELECT type,addition_price FROM type_table
				WHERE menu_id = ?;
			""";

	public List<Menu> GetAllMenu() throws Exception {
		List<Menu> menus = new ArrayList<Menu>();
		SqlRowSet row = jdbc.queryForRowSet(getMenus);
		while (row.next()) {
			int id = row.getInt("menu_id");
			String name = row.getString("name");
			Double price = row.getDouble("price");
			String menu_type = row.getString("menu_type");
			String img_url = row.getString("img_url");
			String size = row.getString("size");
			Menu menu = new Menu(id, name, price, menu_type, img_url, size);

			SqlRowSet type_rows = jdbc.queryForRowSet(getTypesById, id);
			while (type_rows.next()) {
				String type = type_rows.getString("type");
				Double addition_price = type_rows.getDouble("addition_price");
				menu.getTypes().add(new Menu.Type(type, addition_price));
			}
			menus.add(menu);
		}
		return menus;
	}

	final String getMenuById = """
			SELECT menu_id,name,price,menu_type,img_url,size FROM menu
			WHERE menu_id = ?
			""";

	public Menu GetMenuById(int menu_id) throws Exception {
		SqlRowSet row = jdbc.queryForRowSet(getMenuById, menu_id);
		Menu menu = new Menu();
		if (row.next()) {
			menu.setId(row.getInt("menu_id"));
			menu.setName(row.getString("name"));
			menu.setPrice(row.getDouble("price"));
			menu.setMenu_type(row.getString("menu_type"));
			menu.setImg_url(row.getString("img_url"));
			menu.setSize(row.getString("size"));

			SqlRowSet type_rows = jdbc.queryForRowSet(getTypesById, menu.getId());
			while (type_rows.next()) {
				String type = type_rows.getString("type");
				Double addition_price = type_rows.getDouble("addition_price");
				menu.getTypes().add(new Menu.Type(type, addition_price));
			}
		}

		return menu;
	}

	final String updateMenuById = """
			UPDATE menu
			SET name = ?, price = ?, menu_type = ?, size = ?, img_url = ?
			WHERE menu_id = ?;
			""";
	final String updateTypeByMenuId = """
			UPDATE type_table
			SET type = ?, addition_price = ?
			WHERE menu_id = ?;
			""";

	public void UpdateMenuById(MenuRequest arg, int menu_id, String img_url) throws Exception {
		int row_affected = 0;
		for (var c : arg.getCategory()) {
			row_affected += jdbc.update(updateMenuById, arg.getName(), c.getPrice(), arg.getMenu_type(),
					c.getSize(), img_url, menu_id);
		}

		for (var t : arg.getTypes()) {
			jdbc.update(updateTypeByMenuId, t.getType(), t.getAddition_price(), menu_id);
		}

		if (row_affected == 0) {
			throw new MenuNotFoundExeception(MenuNotFoundExeception.GenMessage(menu_id));
		}
	}

	final String deleteAllMenu = """
			DELETE FROM menu
			""";

	public void DeleteAllMenu() {
		jdbc.update(deleteAllMenu);
	}

	// final String createMenu = """
	// INSERT INTO menu(name,price,menu_type,img_url,size)
	// VALUES(?,?,?,?,?)
	// RETURNING menu_id;
	// """;
	final String createMenu = """
			INSERT INTO menu(name,menu_type,img_url)
			VALUES(?,?,?,?,?)
			""";

	final String createCategory = """
			INSERT INTO category(menu_id,size,price)
			VALUES(?,?,?)
			""";

	final String createType = """
			INSERT INTO type_table(menu_id, type, addition_price)
			VALUES(?,?,?)
			""";

	public void CreateMenu(MenuRequest arg, String img_url) throws Exception {
		int id;
		// NOTE: Can use this like Golang
		// SqlRowSet row = jdbc.queryForRowSet(createMenu, arg.getName(), c.getPrice(),
		// arg.getMenu_type(), img_url, c.getSize());
		// if (row.next()) {
		// id = row.getInt("menu_id");
		// Type t = arg.getTypes().get(i);
		// jdbc.update(createType, id, t.getType(), t.getAddition_price());
		// } else {
		// throw new RuntimeException("Can't Get id from createMenu query");
		// }
		KeyHolder key = new GeneratedKeyHolder();
		jdbc.update(conn -> {
			PreparedStatement ps = conn.prepareStatement(createMenu, new String[] { "menu_id" });

			ps.setString(1, arg.getName());
			ps.setString(3, arg.getMenu_type());
			ps.setString(4, img_url);

			return ps;
		}, key);
		if (key.getKey() == null) {
			throw new RuntimeException("Can't get menu_id from createMenu");
		}

		id = key.getKey().intValue();
		for (var c : arg.getCategory()) {
			jdbc.update(createCategory, id, c.getSize(), c.getPrice());
		}

		for (var t : arg.getTypes()) {
			jdbc.update(createType, id, t.getType(), t.getAddition_price());
		}
	}
}

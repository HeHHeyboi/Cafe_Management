package com.CafeManagement.repo;

import java.util.List;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.model.Menu;

public interface MenuRepo {

	public List<Menu> GetAllMenu() throws Exception;

	public Menu GetMenuById(int menu_id) throws Exception;

	public void UpdateMenuById(MenuRequest arg, int menu_id, String img_url) throws Exception;

	public void DeleteMenuById(int menu_id);

	public void DeleteAllMenu();

	// final String createMenu = """
	// INSERT INTO menu(name,price,menu_type,img_url,size)
	// VALUES(?,?,?,?,?)
	// RETURNING menu_id;
	// """;

	public int CreateMenu(MenuRequest arg, String img_url) throws Exception;
}

package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.MenuRequest;
import com.CafeManagement.dto.MenuResponse;
import com.CafeManagement.model.Menu;
import com.CafeManagement.repo.MenuRepo;

@Service
@Transactional
public class MenuService {
	MenuRepo repo;

	@Autowired
	public MenuService(MenuRepo repo) {
		this.repo = repo;
	}

	public int CreateMenu(MenuRequest req, String img_url) throws Exception {
		return repo.CreateMenu(req, img_url);
	}

	public List<MenuResponse> GetAllMenu() throws Exception {
		List<Menu> menus = repo.GetAllMenu();
		List<MenuResponse> responses = new ArrayList<MenuResponse>();
		for (Menu menu : menus) {
			responses.add(new MenuResponse(menu));
		}

		return responses;
	}

	public MenuResponse GetMenu(int id) throws Exception {
		Menu menu = repo.GetMenuById(id);
		return new MenuResponse(menu);
	}

	public void UpdateMenuById(MenuRequest req, int menu_id, String img_url) throws Exception {
		repo.UpdateMenuById(req, menu_id, img_url);
	}

	public void DeleteMenuById(int menu_id) {
		repo.DeleteMenuById(menu_id);
	}

	public void DeleteAllMenu() throws Exception {
		repo.DeleteAllMenu();
	}
}

package com.CafeManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.repo.MenuRepo;
import com.CafeManagement.dto.MenuRequest;

@Service
@Transactional
public class MenuService {
	MenuRepo repo;

	@Autowired
	public MenuService(MenuRepo repo) {
		this.repo = repo;
	}

	public void CreateMenu(MenuRequest req, String img_url) throws Exception {
		repo.CreateMenu(req, img_url);
	}
}

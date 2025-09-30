package com.CafeManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

	public void CreateMenu(MenuRequest req, MultipartFile file) throws Exception {
		repo.CreateMenu(req, "");
	}
}

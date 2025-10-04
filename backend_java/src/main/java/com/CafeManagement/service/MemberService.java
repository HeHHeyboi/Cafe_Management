package com.CafeManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.CafeManagement.dto.MemberRequest;
import com.CafeManagement.dto.MemberResponse;
import com.CafeManagement.model.Member;
import com.CafeManagement.repo.MemberRepo;

@Service
@Transactional
public class MemberService {
	@Autowired
	MemberRepo repo;

	public int CreateMember(MemberRequest req) throws Exception {
		return repo.CreateMember(req);
	}

	public List<MemberResponse> GetAllMembers() throws Exception {
		List<MemberResponse> responses = new ArrayList<>();
		List<Member> members = repo.GetAllMembers();

		for (var m : members) {
			responses.add(new MemberResponse(m));
		}

		return responses;
	}

	public MemberResponse GetMemberById(int id) throws Exception {
		return new MemberResponse(repo.GetMemberById(id));
	}

	public void UpdateMemberById(MemberRequest req, int id) throws Exception {
		repo.UpdateMemberById(req, id);
	}

	public void DeleteMemberById(int id) throws Exception {
		repo.DeleteMeMberById(id);
	}

	public void DeleteAllMembers() {
		repo.DeleteAllMembers();
	}

}

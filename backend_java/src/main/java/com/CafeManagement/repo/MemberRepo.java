package com.CafeManagement.repo;

import java.util.List;

import com.CafeManagement.dto.MemberRequest;
import com.CafeManagement.model.Member;

public interface MemberRepo {

	public int CreateMember(MemberRequest arg) throws Exception;

	public List<Member> GetAllMembers() throws Exception;

	public Member GetMemberById(int id) throws Exception;

	public void UpdateMemberById(MemberRequest arg, int id) throws Exception;

	public void DeleteMeMberById(int id) throws Exception;

	public void DeleteAllMembers();

}

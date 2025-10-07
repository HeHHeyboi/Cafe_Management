package com.CafeManagement.repo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.CafeManagement.dto.MemberRequest;
import com.CafeManagement.exception.MemberNotFoundException;
import com.CafeManagement.model.Member;

@Repository
@Primary
public class SqliteMemberRepo implements MemberRepo {
	@Autowired
	JdbcTemplate jdbc;

	final String createMember = """
			INSERT INTO members(name, status,role)
			VALUES(?,?,?)
			RETURNING member_id;
			""";

	public int CreateMember(MemberRequest arg) throws Exception {
		SqlRowSet row = jdbc.queryForRowSet(createMember, arg.getName(), arg.getStatus(), arg.getRole());
		int id = 0;
		if (row.next()) {
			id = row.getInt("member_id");
		}
		return id;
	}

	final String getAllMembers = """
			SELECT member_id,name,status,role FROM members
			""";

	public List<Member> GetAllMembers() throws Exception {
		SqlRowSet rows = jdbc.queryForRowSet(getAllMembers);
		List<Member> members = new ArrayList<>();

		while (rows.next()) {
			Member member = new Member(
					rows.getInt("member_id"),
					rows.getString("name"),
					rows.getString("status"),
					rows.getString("role"));
			members.add(member);
		}

		return members;
	}

	final String getMemberById = """
			SELECT member_id,name,status,role FROM members
			WHERE member_id = ?
			""";

	public Member GetMemberById(int id) throws Exception {
		SqlRowSet row = jdbc.queryForRowSet(getMemberById, id);
		Member member = null;
		if (row.next()) {
			member = new Member(
					row.getInt("member_id"),
					row.getString("name"),
					row.getString("status"),
					row.getString("role"));
		} else {
			throw new MemberNotFoundException("Can't find Member with id: " + id);
		}

		return member;
	}

	final String updateMemberById = """
			UPDATE members
			SET name = ?, status = ?, role = ?
			WHERE member_id = ?
			""";

	public void UpdateMemberById(MemberRequest arg, int id) throws Exception {
		int apply = jdbc.update(updateMemberById, arg.getName(), arg.getStatus(), arg.getRole(), id);
		if (apply <= 0) {
			throw new MemberNotFoundException("Can't find Member with id: " + id);
		}
	}

	final String deleteMemberById = """
			DELETE FROM members
			WHERE member_id = ?
			""";

	public void DeleteMeMberById(int id) throws Exception {
		int apply = jdbc.update(deleteMemberById, id);
		if (apply <= 0) {
			throw new MemberNotFoundException("Can't find Member with id: " + id);
		}
	}

	final String deleteAllMembers = """
			DELETE FROM members
			""";

	public void DeleteAllMembers() {
		jdbc.update(deleteAllMembers);
	}

}

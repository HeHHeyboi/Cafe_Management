package repository

import "github.com/HeHHeyboi/Cafe_Management/backend/internal/database"

type Repo struct {
	Bill  BillRepo
	User  UserRepo
	Order OrderRepo
	Menu  MenuRepo
}

func CreateRepository(q *database.Queries) Repo {
	return Repo{
		Bill:  newBillRepo(q),
		User:  newUserRepo(q),
		Order: newOrderRepo(q),
		Menu:  newMenuRepo(q),
	}
}

package main

const (
	foreignKeyMissing = "constraint failed: FOREIGN KEY constraint failed (787)"
	usedEmail         = "constraint failed: UNIQUE constraint failed: users.email (2067)"
)

func checkError(err error) string {
	switch err.Error() {
	case foreignKeyMissing:
		return "Please Created User first"
	case usedEmail:
		return "This email Already Used, Please login or Used other email"
	default:
		return err.Error()
	}
}

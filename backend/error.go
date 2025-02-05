package main

const (
	foreignKeyMissing    = "constraint failed: FOREIGN KEY constraint failed (787)"
	usedEmail            = "constraint failed: UNIQUE constraint failed: users.email (2067)"
	loginWithUnknowEmail = "sql: no rows in result set"
)

func checkError(err error) string {
	switch err.Error() {
	case foreignKeyMissing, loginWithUnknowEmail:
		return "Please Created User first with Email First"
	case usedEmail:
		return "This email Already Used, Please login or Used other email"
	default:
		return err.Error()
	}
}

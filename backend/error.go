package main

type ForeignMissing struct{}

func (f ForeignMissing) Error() string {
	return "FOREIGN KEY constraint failed"
}

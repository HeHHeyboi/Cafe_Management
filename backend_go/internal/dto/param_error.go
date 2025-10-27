package dto

import "fmt"

type ParamError struct {
	Value    string
	Location string
	Method   string
}

func (p ParamError) Error() string {
	return fmt.Sprintf(`Invalid Parameter "%s" at %s %s`, p.Value, p.Method, p.Location)
}

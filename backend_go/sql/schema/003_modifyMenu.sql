-- +goose Up
-- +gooseStatementBegin
ALTER TABLE menu
RENAME COLUMN type to menu_type;
-- +gooseStatementEnd



-- +goose Down
-- +gooseStatementBegin
ALTER TABLE menu
RENAME COLUMN menu_type to type;
-- +gooseStatementEnd

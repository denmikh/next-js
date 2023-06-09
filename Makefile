.PHONY: help

NO_COLOR=\x1b[0m
OK_COLOR=\x1b[32;01m
ERROR_COLOR=\x1b[31;01m
WARN_COLOR=\x1b[33;01m

BLACK_COLOR=\x1b[30m
RED_COLOR=\x1b[31m
GREEN_COLOR=\x1b[32m
YELLOW_COLOR=\x1b[33m
BLUE_COLOR=\x1b[34m
MAGENTA_COLOR=\x1b[35m
CYAN_COLOR=\x1b[36m
WHITE_COLOR=\x1b[37m
RESET_COLOR=\x1b[0m

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Start the development server
	docker compose build app
	docker compose up app

unseed-db:
	docker compose run app npm run db:seed:undo:all

seed-db:
	docker compose run app npm run db:seed:all

reseed-db: 
	make unseed-db seed-db ## Clears the DB and seeds it using sequelize commands

test: 
	docker compose run app npm run test -- --coverage --coverageReporters="json-summary"

test-update-snapshot:
	docker compose run app npm run test -- --updateSnapshot --coverage --coverageReporters="json-summary"

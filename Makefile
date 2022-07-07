dbdown: 
	npx knex migrate:down

dbup: 
	npx knex migrate:up

.PHONY: dbdown dbup
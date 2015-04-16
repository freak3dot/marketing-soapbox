# This make file contains shortcuts for developing Marketing Soapbox.
# There is no magic here, it just combines commonly used items into
# single make targets.

.PHONY: docs test

# Constants.


# Install dependancies for commands in this file.
deps:
	npm install -g jshint nodemon yuidocjs

# Run the development server. Watch for file changes.
runserver:
	scripts/start

# Run the server.
run:
	node server.js

# Drop the database.
dropdb:
	node tasks/dropdb.js

# Set up database schema.
resetdb:
	node tasks/resetdb.js

# Set up database schema and default records.
syncdb:
	scripts/syncdb

# Run all tests.
test:
	@./node_modules/.bin/mocha


# Remove compiled files, backup files left by editors and core files.
clean:
	find . \( -name "*.py[co]" -o -name "*~" -o -name "*.core" \) -delete

# Show link to help docs
help:
	@echo "https://github.com/freak3dot/marketing-soapbox"

# Compile documentation
docs:
	rm -rf docs
	yuidoc -o docs -x settings.js .


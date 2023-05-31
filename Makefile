build:
	cd backend && $(MAKE) build
	cd frontend && $(MAKE) build
	cd ../ProjektVid && $(MAKE) build

run:
	docker-compose up 
	# & cd ../ProjektVid && flask run

stop:
	docker-compose down
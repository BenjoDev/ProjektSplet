build:
	cd backend && $(MAKE) build
	cd frontend && $(MAKE) build
	cd ../../projekt_vid && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down
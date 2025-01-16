#!/bin/bash

#docker system prune

#docker-compose rm -f java-service
docker-compose build --no-cache
docker-compose up -d --force-recreate


#docker-compose up java-service -d
#docker-compose build --no-cache java-service
#docker-compose up java-service --force-recreate  -d

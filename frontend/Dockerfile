FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

# RUN apt-get update && apt-get install -y --no-install-recommends bind9-host
# RUN apk update && apk add --no-cache apk-tools
# RUN apk add --no-cache bind-tools

RUN npm install


COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
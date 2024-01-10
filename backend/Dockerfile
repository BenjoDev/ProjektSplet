FROM node:14-slim

# RUN apt-get update && \
#     apt-get install -y openmpi-bin libopenmpi-dev

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001

EXPOSE 5666

CMD [ "npm", "start" ]
# CMD ["nodemon", "./bin/www"]

# CMD ["mpirun", "-np", "3", "--allow-run-as-root", "node", "app.js"]
# CMD ["mpirun", "-np", "3", "--allow-run-as-root", "node", "./bin/www"]

FROM node:8-slim

RUN apt-get update && apt-get install -y cron

RUN (echo "* * * * * bash /usr/src/app/cron") | crontab -

WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD npm start
FROM node:8

RUN apt-get update && apt-get install -y cron

RUN (echo "* * * * * bash /usr/src/app/cron") | crontab -

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start

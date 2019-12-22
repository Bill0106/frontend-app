FROM node:slim

WORKDIR /app

RUN npm install -g serve

COPY dist/index.html ./

CMD [ "serve", "-s", "-l", "80" ]

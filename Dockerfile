FROM node:lts-alpine

WORKDIR /app

RUN npm install -g serve

COPY dist/index.html ./

CMD [ "serve", "-s", "-l", "80" ]

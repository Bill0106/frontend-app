FROM node:lts-alpine

WORKDIR /app

RUN npm install -g serve

COPY dist ./

CMD [ "serve", "-s", "-l", "80" ]

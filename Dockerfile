FROM node:slim as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM mesosphere/aws-cli:latest as upload

WORKDIR /app

ARG ACCESS_KEY_ID
ARG SECRET_ACCESS_KEY
ARG DEFAULT_REGION

ENV AWS_ACCESS_KEY_ID=${ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${DEFAULT_REGION}

COPY --from=build /app/dist ./

RUN aws s3 sync . s3://zhuhaolin.com --exclude "*.html"

FROM node:slim

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist/index.html ./

CMD [ "serve", "-s", "-l", "80" ]

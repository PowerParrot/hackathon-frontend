FROM node:6.6.0-slim

RUN mkdir /app
WORKDIR app

ADD package.json /app/package.json

RUN npm install
RUN npm install -g typings

ADD typings.json /app/typings.json
RUN typings install

COPY . /app/

RUN npm run build

EXPOSE 8080

CMD ['npm', 'start']

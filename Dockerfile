FROM node:carbon
MAINTAINER JongHyeok Kang innovate57@kaist.ac.kr

RUN git clone https://github.com/kingworm/covid_chat.git

WORKDIR ./covid_chat

RUN npm install

ENV NODE_ENV=production

EXPOSE 3002

CMD node src/server/app.js

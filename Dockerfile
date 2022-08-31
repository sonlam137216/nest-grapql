FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV=production

USER node:16.14.0

CMD ["node", "dist/main.js"]
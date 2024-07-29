FROM node:20 AS builder

WORKDIR /src
COPY package.json yarn.lock /src/
RUN yarn install
COPY . /src/

RUN yarn build

FROM node:20

WORKDIR /app
COPY --from=builder /src/dist /app/dist
COPY package.json yarn.lock /app/
RUN set -x \
  && yarn install --prod \
  && yarn cache clean

USER node
CMD ["node", "/app/dist/index.js"]

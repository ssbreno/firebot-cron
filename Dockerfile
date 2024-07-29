FROM node:20 AS builder

WORKDIR /src
COPY package.json yarn.lock /src/
RUN yarn
COPY . /src
RUN yarn tsc

FROM node:20

WORKDIR /app
COPY --from=builder /src/dist /app/dist
COPY package.json yarn.lock /app/
RUN set -x \
  && apk --no-cache add tzdata \
  && ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo America/Sao_Paulo > /etc/timezone \
	&& cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo America/Sao_Paulo > /etc/timezone \
	&& apk del tzdata \
  && yarn install --prod \
  && yarn cache clean

USER node
CMD ["node","/app/dist/index.js"]

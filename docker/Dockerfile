FROM node:20 AS builder

ENV NODE_ENV=build

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./

COPY . ./

RUN npm run build

RUN npm prune --prod

FROM node:20

ENV NODE_ENV=development

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

CMD npm run dev

FROM node:10-alpine as builder

WORKDIR /app

ENV SAPPER_APP_API_URL="https://openpaperback.com/api"

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src
COPY static static
COPY rollup.config.js .
COPY tsconfig.json .

RUN npm run build

FROM node:10-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.json

RUN npm install --production

COPY --from=builder /app/__sapper__ __sapper__
COPY --from=builder /app/static static

CMD npm run start
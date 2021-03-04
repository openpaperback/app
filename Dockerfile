FROM node:10-alpine as builder

WORKDIR /app

COPY . .

ENV SAPPER_APP_API_URL="https://opb.nueleanu.com/api"

RUN npm install
RUN npm run build

FROM node:10-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.json
COPY --from=builder /app/__sapper__ __sapper__
COPY --from=builder /app/static static

RUN npm install --production

CMD npm run start
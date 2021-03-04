FROM node:10-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:10-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/__sapper__ .
COPY --from=builder /app/static .

RUN npm install --production

CMD npm run start
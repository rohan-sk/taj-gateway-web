FROM node:16 as builder
WORKDIR /app
COPY . .
RUN npm install -g npm@8.13.2
RUN npm install --force
 
FROM node:16 AS runner
WORKDIR /app
ENV NODE_ENV production
ENV TARGET_ENV dev
COPY --from=builder /app .
COPY package.json /app/
COPY dotenv/.env.dev /app/.env

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN npm run build:dev
 
EXPOSE 3000
ENTRYPOINT [ "/docker-entrypoint.sh" ]
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf .next

RUN npm run build

RUN npm prune --production

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]

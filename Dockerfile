FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build
# RUN npm prune --production

FROM node:23-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig*.json ./
EXPOSE 3000
CMD ["npm", "run", "start"]
FROM node:latest

WORKDIR /app
COPY . .

RUN npm ci --prod
RUN npm run build

ENV NODE_ENV=production

CMD npm run start
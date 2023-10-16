FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 3016

CMD ["npm", "run", "start"]

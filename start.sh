#!/bin/bash

npm install

npx prisma generate

npx prisma migrate deploy
echo "migrate deploy complete"

echo "seeding database...."
npm run prisma:seed
echo "seeding completed!"

echo "starting development......."
npm run start:dev
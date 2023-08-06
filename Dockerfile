FROM node:18
WORKDIR /usr/src/
COPY . .
RUN npm install
RUN npm run build
RUN npx prisma db pull
EXPOSE 8888
CMD ["npm", "start"]

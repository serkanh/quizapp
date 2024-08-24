FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public/ public/
COPY src/ src/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

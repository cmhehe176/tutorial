FROM node:20.13.1

WORKDIR /hello

COPY package.json pnpm-lock.yaml ./

RUN npm install -g --force pnpm 

RUN pnpm install

COPY . .

COPY .env.example .env

CMD [ "pnpm","run", "dev", "--", "--host" ]

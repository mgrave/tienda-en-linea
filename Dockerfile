###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

#Comentar para levantar la BD y lueggo descomentar para migrar la data
RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm run seed
RUN npm run build

EXPOSE 3000

CMD npm run dev
# API de MECANICA: Trabajo grupal FUNVAL
Descripción:
Para poder usar el presente repositorio, seguir los siguientes pasos:
0.- Crear el archivo '.env' semejante a .env.example; cambiando con tus datos de: contraseña y nombre_bd
1.- Clonar el repositorio
    git clone https://github.com/mmitacc/api_mecanica
2.- Instalar las librerias
    npm install
3.- Crear tablas y base de datos de Postgresql
    npx prisma migrate dev --name init
4.- Generar los schemas de prisma
    npx prisma generate
5.- Generar data inicial con un seed/prisma (automatizado)
    npm run db-seed
6.- Levantar el servidor backend o Api Restfull
    npm run dev

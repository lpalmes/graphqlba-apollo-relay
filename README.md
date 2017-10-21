# graphqlba-apollo-relay

### Backend

Para tener un backend funcionando, navega a `/backend` y corré los siguientes comandos:

1. `yarn install`
1. `touch db/db.sqlite` para crear el archivo vacío que usará SQLite.
1. `yarn db:migrate` para crear las tablas en la DB
1. `yarn db:seed` para llenar la DB con datos de relleno
1. `yarn start` para iniciar el servidor

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    

    async conectarDB() {
        await dbConnection();
    }



    middlewares() {
        //CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosRoute, require('../routes/usuario'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }


}

module.exports = Server;
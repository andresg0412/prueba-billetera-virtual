const express = require('express');
const cors = require('cors');
const AppModule = require('../../application/AppModule');
const serverConfig = require('../../resources/application.json').server;
const routesCustomer = require('./adapters/http/routes/customer.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const sequelize = require('sequelize');
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost'
];

const corsOptions = {
    origin: (origin, callback) => {
        const whitelist = ['http://localhost:3000', 'http://mi-dominio-en-produccion.com', 'http://localhost'];
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());


//CUSTOMERS
app.use('/api', routesCustomer);


//DOCUMENTACION SWAGGER
const swaggerDocument = YAML.load('./swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app, serverConfig };

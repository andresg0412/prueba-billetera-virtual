const express = require('express');
const cors = require('cors');
const serverConfigRest = require('../../resources/application.json').serverRest;
const routesCustomer = require('./http/routes/customer.routes');
const routesWallet = require('./http/routes/wallet.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const appRest = express();

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
appRest.use(cors(corsOptions));

appRest.use(express.json());


//CUSTOMERS
appRest.use('/api', routesCustomer);

//WALLET
appRest.use('/api', routesWallet);


//DOCUMENTACION SWAGGER
const swaggerDocument = YAML.load('./swagger.yml');
appRest.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { appRest, serverConfigRest };

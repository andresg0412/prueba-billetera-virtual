const express = require('express');
const AppModule = require('./application/AppModule');
const CustomerModule = require('./application/modules/customer.module');
const serverConfig = require('./resources/application.json').server;
const { app } = require('./rest_db/infrastructure/server');
const { appRest, serverConfigRest } = require('./rest_client/infrastructure/server');

async function startAppplication() {
    const appModule = new AppModule();

    appModule.addModule(new CustomerModule());

    await Promise.all([
        CustomerModule.prototype.start(),
        appModule.start().then(() => {
            console.log(`Servidor iniciado en http://localhost:${serverConfig.port}`);
            app.listen(serverConfig.port, () => {
                console.log(`Escuchando en http://localhost:${serverConfig.port}`);
            });
            appRest.listen(serverConfigRest.port, () => {
                console.log(`Escuchando REST en http://localhost:${serverConfig.port}`);
            });
        })
    ]);
}

startAppplication().catch(console.error);

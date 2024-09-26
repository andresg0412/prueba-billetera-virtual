const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/wallet.controller');
const WalletServiceUseCase = require('../../../../domain/usecases/wallet.service.usecase');
const WalletRepository = require('../../../../domain/repositories/wallet.repository');
const connectDB = require('../../../database/connectdb');

const sequelize = connectDB();
const walletRepository = new WalletRepository(sequelize);
const walletServiceUseCase = new WalletServiceUseCase(walletRepository);
const walletController = new WalletController(walletServiceUseCase);

//RUTAS DE Wallet
router.post('/deposit', (req, res) => {
    walletController.depositMoney(req, res);
});
router.post('/payment', (req, res) => {
    walletController.makePayment(req, res);
});
router.post('/confirmPayment', (req, res) => {
    walletController.confirmPayment(req, res);
});
module.exports = router
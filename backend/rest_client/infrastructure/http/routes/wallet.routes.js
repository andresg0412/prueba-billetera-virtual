const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/wallet.controller');


const walletController = new WalletController();

//RUTAS DE WALLET
router.post('/deposit', (req, res) => {
    walletController.depositMoney(req, res);
});
router.post('/payment', (req, res) => {
    walletController.makePayment(req, res);
});
module.exports = router
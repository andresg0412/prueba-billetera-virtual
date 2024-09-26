const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/wallet.controller');


const walletController = new WalletController();

//RUTAS DE Customer
router.post('/deposit', (req, res) => {
    walletController.depositMoney(req, res);
});
module.exports = router
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller');


const customerController = new CustomerController();

//RUTAS DE Customer
router.post('/customer', (req, res) => {
    customerController.createCustomer(req, res);
});
router.get('/customers', (req, res) => {
    customerController.getAllCustomers(req, res);
});
router.get('/customer/:id', (req, res) => {
    customerController.getCustomerById(req, res);
});
module.exports = router
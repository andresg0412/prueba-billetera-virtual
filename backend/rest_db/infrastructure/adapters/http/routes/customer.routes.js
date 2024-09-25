const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller');
const CustomerServiceUseCase = require('../../../../domain/usecases/customer.service.usecase');
const CustomerRepository = require('../../../../domain/repositories/customer.repository');
const connectDB = require('../../../database/connectdb');

const sequelize = connectDB();
const customerRepository = new CustomerRepository(sequelize);
const customerServiceUseCase = new CustomerServiceUseCase(customerRepository);
const customerController = new CustomerController(customerServiceUseCase);

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
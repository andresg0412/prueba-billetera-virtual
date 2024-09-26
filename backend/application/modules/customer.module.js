const express = require('express');
const CustomerServiceUseCase = require('../../rest_db/domain/usecases/customer.service.usecase');
const CustomerController = require('../../rest_db/infrastructure/adapters/http/controllers/customer.controller');
const CustomerRepository = require('../../rest_db/domain/repositories/customer.repository');
class CustomerModule{
    constructor() {
        this.CustomerServiceUseCase = null;
        this.CustomerController = null;
        this.CustomerRepository = null;
    }

    async start() {
        try {
            this.CustomerRepository = new CustomerRepository();
            this.CustomerServiceUseCase = new CustomerServiceUseCase(this.CustomerRepository);
            this.CustomerController = new CustomerController(this.CustomerServiceUseCase);
        } catch (error) {
            console.error(error);
            
        }
    }

    getDependencies() {
        return [];
    }
}
module.exports = CustomerModule;
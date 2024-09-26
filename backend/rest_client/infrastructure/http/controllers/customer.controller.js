const axios = require('axios');
const port = require('../../../../resources/application.json').server.port;
const baseUrl = `http://localhost:${port}`;
const { createResponse } = require('../../../../resources/utils/response.util');
class CustomerController {
    constructor(customerServiceUseCase) {
        this.customerServiceUseCase = customerServiceUseCase;
    }
    async createCustomer(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Body es requerido');
                return res.status(400).json(errorResponse);
                return;
            }
            const response = await axios.post(`${baseUrl}/api/customer`, req.body);
            return res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error al crear usuario');
                return res.status(500).json(errorResponse);
            }
        }
    }

    async getAllCustomers(req, res) {
        try {
            const response = await axios.get(`${baseUrl}/api/customers`);
            return res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error al obtener usuarios');
                return res.status(500).json(errorResponse);
            }
        }
    }

    async getCustomerById(req, res) {
        try {
            const response = await axios.get(`${baseUrl}/api/customer/${req.params.id}`);
            return res.status(response.status).json(response.data);
        } catch (error) {
            console.error('Error en getCustomerById:', error);
            return res.status(500).json({ message: 'Error al obtener usuario use controller' });
        }
    }
}

module.exports = CustomerController;
const axios = require('axios');
const port = require('../../../../resources/application.json').server.port;
const baseUrl = `http://localhost:${port}`;
class CustomerController {
    constructor(customerServiceUseCase) {
        this.customerServiceUseCase = customerServiceUseCase;
    }
    async createCustomer(req, res) {
        try {
            if (!req.body) {
                res.status(400).json({ message: 'Body is required' });
                return;
            }
            const response = await axios.post(`${baseUrl}/api/customer`, req.body);
            res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({ message: 'Error al crear usuario use controller' });
            }
        }
    }

    async getAllCustomers(req, res) {
        try {
            const response = await axios.get(`${baseUrl}/api/customers`);
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error('Error en getAllCustomers:', error);
            res.status(500).json({ message: 'Error al obtener usuarios use controller' });
        }
    }

    async getCustomerById(req, res) {
        try {
            const response = await axios.get(`${baseUrl}/api/customer/${req.params.id}`);
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error('Error en getCustomerById:', error);
            res.status(500).json({ message: 'Error al obtener usuario use controller' });
        }
    }
}

module.exports = CustomerController;
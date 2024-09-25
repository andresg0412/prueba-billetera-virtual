const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
class CustomerController {
    constructor(customerServiceUseCase) {
        this.customerServiceUseCase = customerServiceUseCase;
    }
    async createCustomer(req, res) {
        try {
            const requiredFields = ['document', 'name', 'email', 'phone'];
            const { document, name, email, phone } = req.body;
            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);

            if (validationResult !== null) {
                throw { status: 400, body: { message: validationResult } };
            }
            const result = await this.customerServiceUseCase.createCustomer({ document, name, email, phone });
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async getAllCustomers(req, res) {
        try {
            const result = await this.customerServiceUseCase.getAllCustomers();
            res.status(result.status).json(result.body);
        } catch (error) {
            console.error('Error en getAllCustomers:', error);
            res.status(500).json({ message: 'Error al obtener usuarios use controller' });
        }
    }

    async getCustomerById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.customerServiceUseCase.getCustomerById(id);
            res.status(result.status).json(result.body);
        } catch (error) {
            console.error('Error en getCustomerById:', error);
            res.status(500).json({ message: 'Error al obtener usuario use controller' });
        }
    }
}

module.exports = CustomerController;
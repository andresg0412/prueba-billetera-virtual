const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
const { createResponse } = require('../../../../../resources/utils/response.util');
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
                const errorResponse = createResponse(400, false, validationResult);
                return res.status(400).json(errorResponse);
            }
            const result = await this.customerServiceUseCase.createCustomer({ document, name, email, phone });
            const response = createResponse(result.status, true, result.message, result.data);
            return res.status(result.status).json(response);
        } catch (error) {
            const errorResponse = createResponse(error.status || 500, false, error.message, null, error);
            return res.status(error.status || 500).json(errorResponse);
        }
    }

    async getAllCustomers(req, res) {
        try {
            const result = await this.customerServiceUseCase.getAllCustomers();
            const response = createResponse(result.status, true, result.message, result.data);
            return res.status(result.status).json(response);
        } catch (error) {
            const errorResponse = createResponse(error.status || 500, false, error.message, null, error);
            return res.status(500).json(errorResponse);
        }
    }

    async getCustomerById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.customerServiceUseCase.getCustomerById(id);
            const response = createResponse(result.status, true, result.message, result.data);
            return res.status(result.status).json(response);
        } catch (error) {
            const errorResponse = createResponse(error.status || 500, false, error.message, null, error);
            return res.status(500).json(errorResponse);
        }
    }
}

module.exports = CustomerController;
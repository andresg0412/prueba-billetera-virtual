const { createResponse } = require('../../../resources/utils/response.util');

class CustomerServiceUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async getAllCustomers() {
        try {
            const customers = await this.customerRepository.getAllCustomers();
            if (!customers) {
                return createResponse(404, false, 'No hay usuarios');
            }
            return createResponse(200, true, 'Usuarios encontrados', customers);
        } catch (error) {
            return createResponse(500, false, 'Error al obtener usuarios');
        }
    }
    async createCustomer({ document, name, email, phone }) {
        try {
            const customer = await this.customerRepository.createCustomer({ document, name, email, phone });
            if (customer === null) {
                return createResponse(409, false, 'Usuario ya existe');
            }
            const wallet = await this.customerRepository.createWalletOfCustomer(customer.id);
            if (wallet === null) {
                return createResponse(500, false, 'Error al crear wallet de usuario');
            }
            return createResponse(200, true, 'Usuario creado', customer);
        } catch (error) {
            return createResponse(500, false, 'Error al crear usuario');
        }
    }

    async getCustomerById(id) {
        try {
            const customer = await this.customerRepository.getCustomerById(id);
            if (!customer) {
                return createResponse(404, false, 'Usuario no encontrado');
            }
            return createResponse(200, true, 'Usuario encontrado', customer);
        } catch (error) {
            return createResponse(500, false, 'Error al obtener usuario');
        }
    }

}

module.exports = CustomerServiceUseCase;
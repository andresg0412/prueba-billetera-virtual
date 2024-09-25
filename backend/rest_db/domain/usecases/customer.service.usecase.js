class CustomerServiceUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async getAllCustomers() {
        try {
            const customers = await this.customerRepository.getAllCustomers();
            if (!customers) {
                return { status: 404, body: { message: 'No se encontraron usuarios' } };
            }
            return { status: 200, body: customers };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener usuarios use case' } };
        }
    }
    async createCustomer({ document, name, email, phone }) {
        try {
            const customer = await this.customerRepository.createCustomer({ document, name, email, phone });
            if (customer === null) {
                return { status: 409, body: { message: 'Usuario ya existe' } };
            }
            const wallet = await this.customerRepository.createWalletOfCustomer(customer.id);
            if (wallet === null) {
                return { status: 500, body: { message: 'Error al crear wallet' } };
            }
            return { status: 200, body: { message: 'Usuario y Wallet creados con éxito'} };
        } catch (error) {
            throw { status: 500, body: { message: 'Error al crear usuario' } };
        }
    }
    //updateCustomer({ id, document, name, email, celular }) {
    //    return Customer.update({ id, document, name, email, celular });
    //}

    //deleteCustomer(id) {
    //    return Customer.delete(id);
    //}

    async getCustomerById(id) {
        try {
            const customer = await this.customerRepository.getCustomerById(id);
            return { status: 200, body: customer };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener el usuario' } };
        }
    }

    //getCustomerEvents(id) {
    //    return Customer.getEvents(id);
    //}
}

module.exports = CustomerServiceUseCase;
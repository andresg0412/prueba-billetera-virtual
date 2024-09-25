const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');

class CustomerRepository {
    constructor(sequelize) {
        this.customer = Customer;
        this.sequelize = sequelize;
    }
    async getAllCustomers() {
        try {
            const rows = await this.customer.findAll();
            if (!rows || rows.length === 0) {
                return [];
            };
            return rows;
        } catch (error) {
            console.error('Error en getAllCustomers:', error);
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
    }
    async getCustomerById(id) {
        try {
            const rows = await this.customer.findByPk(id);
            return rows;
        } catch (error) {
            throw error;
        }
    }
    async createCustomer(customer) {
        try {
            const findCustomer = await this.customer.findOne({ where: { document: customer.document } });

            if (findCustomer !== null) {
                return null;
            }
            const customercreate = await this.customer.create(customer);
            return customercreate;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Usuario ya existe' } };
            }

            throw error;
        }
    }

    async createWalletOfCustomer(id) {
        try {
            const customer = await this.customer.findByPk(id);
            if (!customer) {
                throw { status: 404, body: { message: 'No se encontro el usuario' } };
            }
            const wallet = await Wallet.create({ customerId: id });
            return wallet;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CustomerRepository;
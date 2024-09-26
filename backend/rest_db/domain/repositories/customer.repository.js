const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');
const { createResponse } = require('../../../resources/utils/response.util');

class CustomerRepository {
    constructor(sequelize) {
        this.customer = Customer;
        this.sequelize = sequelize;
    }
    async getAllCustomers() {
        try {
            const rows = await this.customer.findAll();
            if (!rows || rows.length === 0) {
                return null;
            };
            return rows;
        } catch (error) {
            throw createResponse(500, false, 'Error al obtener usuarios');
        }
    }
    async getCustomerById(id) {
        try {
            const rows = await this.customer.findByPk(id);
            return rows;
        } catch (error) {
            throw createResponse(500, false, 'Error al obtener usuario');
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
                throw createResponse(409, false, 'Usuario ya existe');
            }

            throw createResponse(500, false, 'Error al crear usuario');
        }
    }

    async createWalletOfCustomer(id) {
        try {
            const customer = await this.customer.findByPk(id);
            if (!customer) {
                return null;
            }
            const wallet = await Wallet.create({ customerId: id });
            return wallet;
        } catch (error) {
            throw createResponse(500, false, 'Error al crear wallet de usuario');
        }
    }
}

module.exports = CustomerRepository;
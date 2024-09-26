const axios = require('axios');
const port = require('../../../../resources/application.json').server.port;
const baseUrl = `http://localhost:${port}`;
const { createResponse } = require('../../../../resources/utils/response.util');
class WalletController {
    async depositMoney(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }
            const response = await axios.post(`${baseUrl}/api/deposit`, req.body);
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

    async makePayment(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }
            const response = await axios.post(`${baseUrl}/api/payment`, req.body);
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

    async confirmPayment(req, res) {
        try {
            if (!req.body) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }
            const response = await axios.post(`${baseUrl}/api/confirmPayment`, req.body);
            return res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error al confirmar pago');
                return res.status(500).json(errorResponse);
            }
        }
    }

    async getBalance(req, res) {
        try {
            const {  document } = req.params;
            const { phone } = req.params;
            if (!document || !phone) {
                const errorResponse = createResponse(400, false, 'Error en la petición');
                return res.status(400).json(errorResponse);
            }
            const response = await axios.get(`${baseUrl}/api/balance/${document}/${phone}`);
            return res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                const errorResponse = createResponse(500, false, 'Error al obtener balance');
                return res.status(500).json(errorResponse);
            }
        }
    }

};

module.exports = WalletController;
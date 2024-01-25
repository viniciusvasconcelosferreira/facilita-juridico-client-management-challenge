const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const clientMiddleware = require('../middleware/client.middleware');

// Obter todos os clientes
router.get('/clients', clientController.getAllClients);

// Obter um cliente pelo nome, email ou telefone
router.get('/clients/search', clientController.searchClients);

// Obter a rota mais curta entre os clientes
router.get('/clients/short-route', clientController.getShortestRoute);

// Obter um cliente por ID
router.get('/clients/:id', clientController.getClientById);

// Adicionar um novo cliente com validação
router.post('/clients', clientMiddleware.validateRegisterClient, clientController.addClient);

// Atualizar um cliente por ID com validação
router.put('/clients/:id', clientMiddleware.validateUpdateClient, clientController.updateClient);

// Excluir um cliente por ID
router.delete('/clients/:id', clientController.deleteClient);

// Excluir todos os clientes
router.delete('/clients', clientController.deleteAllClients);

module.exports = router;
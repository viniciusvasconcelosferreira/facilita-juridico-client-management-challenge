const { pool } = require('../../config/db.config');

// Função para obter todos os clientes
const getAllClients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM client');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para buscar clientes por nome, email ou telefone
const searchClients = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const result = await pool.query(
      'SELECT * FROM client WHERE name ILIKE $1 OR email ILIKE $1 OR telephone ILIKE $1',
      [`%${searchQuery}%`],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para obter um cliente por ID
const getClientById = async (req, res) => {
  const clientId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM client WHERE id = $1', [clientId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.status(200).json({ message: 'Cliente encontrado com sucesso', data: result.rows[0] });
    }
  } catch (error) {
    console.error('Erro ao obter cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para adicionar um novo cliente
const addClient = async (req, res) => {
  const { name, email, telephone } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO client (name, email, telephone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, telephone],
    );
    res.status(201).json({ message: 'Cliente adicionado com sucesso.', data: result.rows[0] });
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para atualizar um cliente
const updateClient = async (req, res) => {
  const clientId = req.params.id;
  const { name, email, telephone } = req.body;

  const updateFields = [];
  const params = [];
  let index = 1;

  if (name !== undefined) {
    updateFields.push(`name = $${index}`);
    params.push(name);
    index++;
  }

  if (email !== undefined) {
    updateFields.push(`email = $${index}`);
    params.push(email);
    index++;
  }

  if (telephone !== undefined) {
    updateFields.push(`telephone = $${index}`);
    params.push(telephone);
    index++;
  }

  params.push(clientId); // Último parâmetro é o ID do cliente

  const updateQuery = `UPDATE client
                       SET ${updateFields.join(', ')},
                           updated_at = NOW()
                       WHERE id = $${index} RETURNING *`;

  try {
    const result = await pool.query(updateQuery, params);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.status(200).json({ message: 'Cliente atualizado com sucesso.', data: result.rows[0] });
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para excluir um cliente
const deleteClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM client WHERE id = $1 RETURNING *', [clientId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.status(200).json({ message: 'Cliente excluído com sucesso' });
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para excluir todos os clientes
const deleteAllClients = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM client RETURNING *');

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nenhum cliente encontrado para excluir' });
    } else {
      res.status(200).json({ message: 'Todos os clientes foram excluídos com sucesso' });
    }
  } catch (error) {
    console.error('Erro ao excluir todos os clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
  searchClients,
  deleteAllClients,
};
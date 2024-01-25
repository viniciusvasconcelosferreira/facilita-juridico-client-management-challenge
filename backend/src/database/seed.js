const { pool } = require('../../config/db.config');
const { fakerPT_BR  } = require('@faker-js/faker');
const { removePhoneMask } = require('../utils/removeMask');

const seedDatabase = async () => {
  const numberOfEntries = 10; // Defina o número de entradas falsas que você deseja criar

  for (let i = 0; i < numberOfEntries; i++) {
    const name = fakerPT_BR.person.fullName();
    const email = fakerPT_BR.internet.email();
    const telephoneWithMask = fakerPT_BR.phone.number();
    const telephone = removePhoneMask(telephoneWithMask);

    try {
      await pool.query(
        'INSERT INTO client (name, email, telephone) VALUES ($1, $2, $3)',
        [name, email, telephone],
      );
      console.log(`Cliente adicionado: ${name}, ${email}, ${telephone}`);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  }

  console.log('Seeding concluído.');
};

seedDatabase();

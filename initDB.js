'use strict';

require('dotenv').config();

// Initial data loading to the DB:
const connection = require('./lib/connectMongoose');

const readline = require('node:readline');
const initData = require('./init-db-data.json');

// This is how we load all the models in a single require:
const { Product, User } = require('./models');

// handle the error when loading main:
main().catch((err) => {
  console.log('There was a mistake', err);
});

// main function to load the data:
async function main() {
  await new Promise((resolve, reject) => connection.once('open', resolve));

  // confirm the deletion:
  const questionDelete = await question(
    `Are you sure you want to delete the DB and load new data?, yes or no: `
  );

  // If you answer that we don't leave:
  if (!questionDelete) {
    process.exit();
  }

  // load the collection of Users:
  await initUsers();
  // load the collection of Products:
  await initProducts();

  // close the connection:
  connection.close();
}

// Function that loads Products:
async function initProducts() {
  // delete all documents from the DB:
  const deleted = await Product.deleteMany();
  console.log(`Eliminated ${deleted.deletedCount} products`);

  // Obtenemos el id del usuario de bd:
  const [user, luke] = await Promise.all([
    User.findOne({ email: 'user@example.com' }),
    User.findOne({ email: 'luke@example.com' }),
  ]);

  // Le asignamos los usuarios a los agentes:
  const dataProducts = initData.products.map((product, index) => {
    if (index === 0) {
      return { ...product, owner: user._id };
    } else if (index === 1) {
      return { ...product, owner: user._id };
    } else if (index === 2) {
      return { ...product, owner: user._id };
    } else if (index === 3) {
      return { ...product, owner: user._id };
    } else if (index === 4) {
      return { ...product, owner: luke._id };
    } else if (index === 5) {
      return { ...product, owner: luke._id };
    } else if (index === 6) {
      return { ...product, owner: luke._id };
    }
    return product;
  });

  // add new data to the database:
  const inserted = await Product.insertMany(dataProducts);
  console.log(`Created ${inserted.length} products`);
}

async function initUsers() {
  try {
    // delete
    const deleted = await User.deleteMany();
    console.log(`Eliminated ${deleted.length} users.`);

    // Create new users with hashed passwords
    const usersWithHash = await Promise.all(
      initData.users.map(async (user) => {
        const hashedPassword = await User.hashPassword(user.password);
        return {
          email: user.email,
          password: hashedPassword,
        };
      })
    );

    const inserted = await User.insertMany(usersWithHash);
    console.log(`Created ${inserted.length} users.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Deletion question function:
function question(text) {
  return new Promise((resolve, reject) => {
    // connect with the console:
    const lineCommand = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    lineCommand.question(text, (response) => {
      lineCommand.close();
      resolve(response.toLowerCase() === 'yes');
    });
  });
}

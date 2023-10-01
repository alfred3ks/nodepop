'use strcit';

// Initial data loading to the DB:
const connection = require('./lib/connectMongoose');
const Product = require('./models/Product');
const readline = require('node:readline');
const initData = require('./products.json');

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

  // add new data to the database:
  const inserted = await Product.insertMany(initData.products);
  console.log(`Created ${inserted.length} products`);
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

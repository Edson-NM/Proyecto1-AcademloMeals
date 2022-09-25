const { app } = require('./app');
const { db } = require('./utils/database.util');
const { initModels } = require('./models/initModels');

const startServer = async () => {
  // Authenticate DB
  await db.authenticate();

  // Start relation between models
  initModels();

  // Sync DB
  await db.sync();

  // Set server to listen
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`);
  });
};

startServer();

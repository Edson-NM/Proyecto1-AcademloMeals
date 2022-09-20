const { app } = require('./app');
const { db } = require('./utils/database.util');

const startServer = async () => {
  await db.authenticate();

  await db.sync();

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`);
  });
};

startServer();

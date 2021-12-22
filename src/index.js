const app = require('./app');
const logger = require('../utils/logger');

app.listen(process.env.PORT, () => {
  logger.info(
    `Server is now listening on http://localhost:${process.env.PORT}`,
  );
});

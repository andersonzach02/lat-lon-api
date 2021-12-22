const { Router } = require('express');

const router = Router();

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
  res.send({ message: 'API Home Route 🏡' });
});

module.exports = router;

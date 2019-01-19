const debug = require('debug')('app:routes:v1');
const express = require('express');

debug('configuring routes');

const router = express.Router();

const league = require('./league');

router.use('/api', league);

module.exports = router;

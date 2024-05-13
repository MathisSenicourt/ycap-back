require('dotenv').config();
const express = require('express');
const router = express.Router();
const POIModel = require('../models/POIModel');
const cityModel = require('../models/cityModel');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = router;
const express = require('express');

// Routers

const app = express();

// Enable JSON Data
app.use(express.json());

// Endpoints

module.exports = { app };

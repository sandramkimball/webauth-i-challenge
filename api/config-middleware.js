const express = require('express');
const hlemet = require('helmet');

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    
};
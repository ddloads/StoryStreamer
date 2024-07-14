const express = require('express');
const { readConfig, writeConfig } = require('../utils/configUtil');
const router = express.Router();

// Get libraries
router.get('/libraries', (req, res) => {
  const config = readConfig();
  res.json(config.libraries);
});

// Add or update a library
router.post('/libraries', (req, res) => {
  const { libraries } = req.body;
  const config = readConfig();
  config.libraries = libraries;
  writeConfig(config);
  res.json(config.libraries);
});

// Delete a library
router.delete('/libraries/:name', (req, res) => {
  const { name } = req.params;
  const config = readConfig();
  config.libraries = config.libraries.filter(library => library.name !== name);
  writeConfig(config);
  res.json(config.libraries);
});

// Initiate scan or purge
router.post('/libraries/:name/action', (req, res) => {
  const { name } = req.params;
  const { action } = req.body; // action can be "scan" or "purge"
  const config = readConfig();
  const library = config.libraries.find(library => library.name === name);
  if (library) {
    library.action = action;
    writeConfig(config);
    res.json(library);
  } else {
    res.status(404).send('Library not found');
  }
});

module.exports = router;
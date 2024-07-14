const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, '../config.json');
const logFilePath = path.join(__dirname, '../logs/app.log');

// Read configuration from the config file
const readConfig = () => {
  const data = fs.readFileSync(configFilePath);
  return JSON.parse(data);
};

// Write updated configuration to the config file
const writeConfig = (newConfig) => {
  fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
};

// Log message with different levels
const logMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${level}] ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry);
  trimLogs(); // Ensure logs are trimmed after each write
};

// Trim logs to keep a maximum of 5 log files
const trimLogs = () => {
  const logDir = path.dirname(logFilePath);
  const logFiles = fs.readdirSync(logDir).filter(file => file.startsWith('app.log'));
  if (logFiles.length > 5) {
    const oldestFile = logFiles.sort()[0];
    fs.unlinkSync(path.join(logDir, oldestFile));
  }
};

module.exports = { readConfig, writeConfig, logMessage, logFilePath };

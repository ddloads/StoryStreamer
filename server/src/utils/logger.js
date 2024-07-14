import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = path.join(__dirname, '../../public/logs');

// Ensure the logs directory exists synchronously
const ensureLogDirectoryExists = () => {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
};

// Create a write stream for log files
const createLogStream = (logType) => {
  const date = format(new Date(), 'yyyy-MM-dd');
  const logFilePath = path.join(logDirectory, `${date}-${logType}.log`);
  return fs.createWriteStream(logFilePath, { flags: 'a' });
};

// Ensure log directory exists before creating streams
ensureLogDirectoryExists();

const systemLogStream = createLogStream('system');
const warningLogStream = createLogStream('warnings');
const errorLogStream = createLogStream('errors');

// Logger function
const logger = {
  info: (message) => {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    systemLogStream.write(logMessage);
    console.log(logMessage.trim());
  },
  warn: (message) => {
    const logMessage = `[WARN] ${new Date().toISOString()} - ${message}\n`;
    warningLogStream.write(logMessage);
    console.warn(logMessage.trim());
  },
  error: (message) => {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    errorLogStream.write(logMessage);
    console.error(logMessage.trim());
  },
  trimLogs: async () => {
    const files = await fs.promises.readdir(logDirectory);
    const logFiles = files.filter(file => file.endsWith('.log')).sort((a, b) => {
      const aDate = new Date(a.split('-')[0]);
      const bDate = new Date(b.split('-')[0]);
      return bDate - aDate;
    });

    if (logFiles.length > 5) {
      const filesToDelete = logFiles.slice(5);
      for (const file of filesToDelete) {
        await fs.promises.unlink(path.join(logDirectory, file));
      }
    }
  },
};

export default logger;

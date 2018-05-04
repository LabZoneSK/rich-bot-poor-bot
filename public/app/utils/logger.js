const ERROR = 'error';
const DEBUG = 'debug';
const INFO = 'info';
const SUCCESS = 'success';

const msgTemplate = {
  level: DEBUG,
  title: 'This is log message',
  description: 'Short description of message'
};

const error = (title, description='') => log(ERROR, title, description);
const debug = (title, description='') => log(DEBUG, title, description);
const info = (title, description='') => log(INFO, title, description);
const success = (title, description='') => log(SUCCESS, title, description);

const log = (level, title, description = '') => {
  const now = new Date();
  title = title;
  const message = Object.assign(msgTemplate, {
    level,
    title,
    timestamp: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
    description
  })
  return message;
};

module.exports = {
  ERROR,
  DEBUG,
  INFO,
  SUCCESS,
  log,
  error,
  debug,
  info,
  success
}
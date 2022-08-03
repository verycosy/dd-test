/** @type {import('pm2').Proc} */

const apps = [
  {
    name: 'sample-server',
    script: './dist/main.js',
    env_dev: {
      NODE_ENV: 'dev',
    },
    env_production: {
      NODE_ENV: 'production',
      DD_LOGS_INJECTION: true,
    },
  },
];

module.exports = { apps };

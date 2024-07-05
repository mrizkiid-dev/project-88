module.exports = {
    apps: [
      {
        name: 'project88',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env_staging: {
          NODE_ENV: "staging"
        },
      }
    ]
  }
  
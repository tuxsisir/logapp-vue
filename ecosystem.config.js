module.exports = {
  apps : [
    {
      name: "core.aayulogic",
      script: "/home/macq/app_frontend/node_modules/nuxt/bin/nuxt-start",
      env: {
        "HOST": "0.0.0.0",
        "PORT": 3001,
        "NODE_ENV": "production"
      }
    }
  ]
}

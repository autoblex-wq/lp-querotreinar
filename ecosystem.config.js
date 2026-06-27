// PM2 process config for the Next.js standalone server.
// Usage on the VPS (from the project folder):
//   npm run build:standalone
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup   # keep it running across reboots
module.exports = {
  apps: [
    {
      name: "lp-querotreinar",
      script: ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        // The app listens only on localhost; Nginx is the public entrypoint.
        HOSTNAME: "127.0.0.1",
        PORT: 3000,
      },
    },
  ],
};

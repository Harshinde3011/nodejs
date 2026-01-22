# nodejs
revise node js concepts 

# MY-CONTACT-BACKEND

This is a Node.js backend application for managing contacts. The application was facing **socket hang issues**, which are resolved by properly handling server listen and environment configurations.

---

## 🛠️ Prerequisites

- Node.js v18+
- Docker v24+
- npm / yarn
- Postman (optional, for testing APIs)

---

## ⚡ Fixing Socket Hang Issue

If your Node.js app hangs when using sockets or API requests, ensure the following in `server.js`:

```javascript
const app = require('./app'); // import your express app
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});
```

##DOCKER COMMANDS

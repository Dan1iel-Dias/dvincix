const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});

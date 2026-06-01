import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("src/public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("src/public/pages/index.html"));
});

app.get("/:page", (req, res) => {
  const { page } = req.params;

  res.sendFile(path.resolve(`src/public/pages/${page}.html`), (err) => {
    if (err) {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

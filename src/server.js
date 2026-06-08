import express from "express";
import path from "path";
import ingressosRoutes from "./routes/ingressos.routes.js";

const app = express();

const publicPath = path.resolve(process.cwd(), "src/public");

app.use(express.json());
app.use(express.static(publicPath));

app.use("/api/ingressos", ingressosRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "pages/index.html"));
});

app.get("/:page", (req, res) => {
  res.sendFile(
    path.join(publicPath, `pages/${req.params.page}.html`),
    (err) => {
      if (err) {
        res.redirect("/");
      }
    },
  );
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Servidor local na porta ${PORT}`));
}

export default app;

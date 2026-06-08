import fs from "fs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "src/database/ingressos.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function generateCode() {
  return "AQM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function createIngresso(req, res) {
  const { nome, email, tipo, quantidade, dia, eventos } = req.body;

  const ingressos = readDB();

  const ingresso = {
    id: Date.now(),

    codigo: generateCode(),

    nome,
    email,
    tipo,
    quantidade,
    dia,
    eventos,

    createdAt: new Date().toISOString(),
  };

  ingressos.push(ingresso);

  writeDB(ingressos);

  res.status(201).json({
    sucesso: true,
    ingresso,
  });
}

export function getIngressos(req, res) {
  res.json(readDB());
}

export function getIngresso(req, res) {
  const ingresso = readDB().find((i) => i.codigo === req.params.codigo);

  if (!ingresso) {
    return res.status(404).json({
      erro: "Ingresso não encontrado",
    });
  }

  res.json(ingresso);
}

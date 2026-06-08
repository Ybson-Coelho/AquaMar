import { connectDB } from "../lib/mongodb.js";
import Ingresso from "../models/Ingresso.js";

function generateCode() {
  return "AQM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createIngresso(req, res) {
  try {
    await connectDB();

    const ingresso = await Ingresso.create({
      codigo: generateCode(),

      nome: req.body.nome,
      email: req.body.email,
      tipo: req.body.tipo,
      quantidade: req.body.quantidade,
      dia: req.body.dia,
      eventos: req.body.eventos,
    });

    res.status(201).json({
      sucesso: true,
      ingresso,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao criar ingresso",
    });
  }
}

export async function getIngressos(req, res) {
  await connectDB();

  const ingressos = await Ingresso.find().sort({
    createdAt: -1,
  });

  res.json(ingressos);
}

export async function getIngresso(req, res) {
  await connectDB();

  const ingresso = await Ingresso.findOne({
    codigo: req.params.codigo,
  });

  if (!ingresso) {
    return res.status(404).json({
      erro: "Ingresso não encontrado",
    });
  }

  res.json(ingresso);
}

import mongoose from "mongoose";

const ingressoSchema = new mongoose.Schema(
  {
    codigo: String,

    nome: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    quantidade: {
      type: Number,
      required: true,
    },

    dia: {
      type: String,
      required: true,
    },

    eventos: [
      {
        title: String,
        time: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Ingresso ||
  mongoose.model("Ingresso", ingressoSchema);

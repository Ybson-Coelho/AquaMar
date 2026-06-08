import { Router } from "express";

import {
  createIngresso,
  getIngressos,
  getIngresso,
} from "../controllers/ingressos.controller.js";

const router = Router();

router.post("/", createIngresso);

router.get("/", getIngressos);

router.get("/:codigo", getIngresso);

export default router;

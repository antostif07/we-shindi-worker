import express from "express";
import 'dotenv/config';
import { workerLoop } from "./worker.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Worker actif !"));

workerLoop().catch(console.error);

app.listen(PORT, () => {
  console.log(`Worker écoute sur le port ${PORT}`);
});

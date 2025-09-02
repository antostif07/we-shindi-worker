import express from "express";
import { workerLoop } from "./worker"; // ta fonction qui fait polling Redis

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Worker actif !"));

// Démarre le polling Redis
workerLoop().catch(console.error);

app.listen(PORT, () => {
  console.log(`Worker écoute sur le port ${PORT}`);
});

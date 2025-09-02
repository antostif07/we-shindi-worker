import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Worker actif !"));

// Simuler polling Redis en arrière-plan
async function startWorker() {
  while (true) {
    console.log("Polling Redis...");
    await new Promise(r => setTimeout(r, 5000));
  }
}

startWorker().catch(console.error);

app.listen(PORT, () => {
  console.log(`Worker écoute sur le port ${PORT}`);
});

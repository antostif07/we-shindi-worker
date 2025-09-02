import { Redis } from "@upstash/redis";
import fetch from "node-fetch";
import { processMessageAI } from "./ai";

const redis = Redis.fromEnv();

export async function workerLoop() {
  console.log("Worker démarré...");

  while (true) {
    const taskJson = await redis.rpop("queue:tasks"); // récupère le dernier job
    if (taskJson) {
      const { clientId, message, from, intent } = JSON.parse(taskJson);
      console.log("📩 Traitement message:", { clientId, message, intent });

      const result = await processMessageAI({ clientId, message, intent });

      await fetch(`${process.env.BACKEND_URL}/api/worker-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, from, result }),
      });

      console.log("✅ Job traité pour client:", clientId);
    } else {
      // Pas de job, attendre quelques secondes avant de vérifier à nouveau
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

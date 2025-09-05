import { RAGChat, openai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: openai("gpt-3.5-turbo", { apiKey: process.env.OPENAI_API_KEY }),
  redis: redis,
});

import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});
console.log("KEY =", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const res = await openai.responses.create({
    model: "gpt-4o-mini",
    input: "Say hello",
  });

  console.log(res.output_text);
}

run();
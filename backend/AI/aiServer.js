
import { readFile } from "node:fs/promises";
import { Ollama } from "ollama";

import { Agent, setGlobalDispatcher } from "undici";

setGlobalDispatcher(new Agent({
    headersTimeout: 60 * 60 * 1000,
    bodyTimeout: 60 * 60 * 1000
}));

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11435";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "lfm3";

const SYSTEM_PROMPT = await readFile(
    new URL("./masterPrompt.txt", import.meta.url),
    "utf8"
);

export const GenerateTrip = async (tripData, res) => {
    try {
        const ollama = new Ollama({
            host: OLLAMA_BASE_URL
        });

        let finalResult = "";
        let completed = false;

        const response = await ollama.chat({
            model: OLLAMA_MODEL,
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: JSON.stringify(tripData)
                }
            ],
            stream: true,
            format: "json",
            options: {
                temperature: 0.1,
                num_ctx: 4096,
                num_predict: 2048
            }
        });

        for await (const part of response) {

            // Stream thinking
            if (part.message?.thinking) {
                res.write(JSON.stringify({
                    type: "thinking",
                    content: part.message.thinking
                }) + "\n");
            }

            // Collect generated JSON
            if (part.message?.content) {
                finalResult += part.message.content;
            }

            // Generation finished
            if (part.done) {
                completed = true;

                console.log("Ollama finished:", part.done_reason);
                console.log("Generated characters:", finalResult.length);

                if (!finalResult.trim()) {
                    throw new Error("Ollama finished without generating content.");
                }

                res.write(JSON.stringify({
                    type: "result",
                    content: finalResult
                }) + "\n");
            }
        }

        if (!completed) {
            throw new Error("Ollama stream closed without a final response.");
        }

        res.end();

    } catch (error) {
        console.error("Trip generation error:", error);

        if (!res.headersSent) {
            res.status(500);
        }

        res.end(JSON.stringify({
            type: "error",
            content: error.message
        }) + "\n");
    }
};

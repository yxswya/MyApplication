import { treaty } from "@elysiajs/eden";
import type app from "../src";

const api = treaty<typeof app>("localhost:3000");

const chat = api.chat.subscribe();

chat.subscribe((message) => {
    console.log("got ->", message);
});

chat.on("open", () => {
    chat.send("hello from client");
});
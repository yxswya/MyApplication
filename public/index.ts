import { treaty } from "@elysiajs/eden";
import type app from "../src";
import { createIcons, Menu, ArrowRight, Anchor, Download, Clapperboard, Rss, NotebookText } from 'lucide';
import './global.css'

createIcons({
    attrs: {
        class: "lucide-icon",
    },
    icons: {
        Menu,
        ArrowRight,
        Anchor,
        Download,
        Clapperboard,
        NotebookText,
    }
});

const api = treaty<typeof app>("localhost:3000");

const chat = api.chat.subscribe();

chat.subscribe((message) => {
    console.log("got ->", message);
});

chat.on("open", () => {
    chat.send("hello from client");
});
import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'

const app = new Elysia()
    .use(cors())
    .use(staticPlugin())
    .ws("/chat", {
        body: t.String(),
        response: t.String(),
        message(ws, message) {
            ws.send(message);
        },
    })
    .listen(3000);

export default app
import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import Parser from "rss-parser";

const rssParser = new Parser();

const app = new Elysia()
    .use(cors())
    .use(staticPlugin({
        prefix: '/',
    }))
    .post("/api/rss-feed",
        async ({ body }) => {

            // 使用代理服务获取 RSS
            const proxyUrl = `https://feed-craft.colinx.one/craft/proxy?input_url=${encodeURIComponent(body.url)}`;

            const response = await fetch(proxyUrl, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    Accept: "application/xml, text/xml, */*",
                },
            });

            // 获取 XML 文本
            const xmlText = await response.text();

            // 使用 rss-parser 解析 XML
            const feed = await rssParser.parseString(xmlText);

            console.log("Parsed RSS Feed:", feed);
            // 转换为统一格式
            const rssData = {
                title: feed.title || "",
                description: feed.description || "",
                link: feed.link || body.url,
                image: feed.image?.url || feed.image || "",
                items: (feed.items || []).slice(0, 10).map((item) => ({
                    title: item.title || "",
                    link: item.link || "",
                    pubDate: item.pubDate || item.isoDate || "",
                    description: item.contentSnippet || item.summary || "",
                })),
            };

            return JSON.stringify(rssData);
        },
        {
            body: t.Object({
                url: t.String(),
            }),
            response: t.String(),
        }
    )
    .ws("/chat", {
        body: t.String(),
        response: t.String(),
        message(ws, message) {

        },
    })
    .listen(3000);

export default app
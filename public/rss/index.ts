import '../global.css'

fetch("/api/rss-feed", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        url: "http://www.ruanyifeng.com/blog/atom.xml",
    }),
}).then((res) => res.json())
    .then((data) => {
        console.log("RSS Data:", data);
        const container = document.getElementById("rss-container");
        if (container) {
            const feedElement = document.createElement("div");
            feedElement.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <ul>
                    ${data.items.map((item: any) => `
                        <li class="bg-black/2 p-4 rounded-lg mb-2">
                            <a href="${item.link}" target="_blank">${item.title}</a>    
                            <p>${item.pubDate}</p>
                            <p class="truncate">${item.description}</p>
                        </li>
                    `).join("")}
                </ul>
            `;
            container.appendChild(feedElement);
        }
    })
    .catch((error) => {
        console.error("Error fetching RSS feed:", error);
    });

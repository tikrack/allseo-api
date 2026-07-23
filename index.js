const getCSRF = require("./csrf-token")

getCSRF().then(({ csrfToken, cookie }) => {
    fetch(
        "https://allseo.ir/website-analyzer/analyze/",
        {
            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": csrfToken, 
                "Cookie": cookie            
            },

            body: new URLSearchParams({
                csrfmiddlewaretoken: csrfToken,
                suite: "general",
                url: "https://example.com",
            }),
        }
    ).then(r => {
        r.text().then(html => {
            const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

            if (canonicalMatch) {
                const reportUrl = canonicalMatch[1];
                console.log("آدرس گزارش:", reportUrl);
            } else {
                console.log("تگ canonical پیدا نشد.");
            }
        })
    })
})

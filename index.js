const pageResponse = await fetch(
  "https://allseo.ir/",
  {
    credentials: "include",
  }
);

const html = await pageResponse.text();

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const csrfToken = doc.querySelector(
  'input[name="csrfmiddlewaretoken"]'
)?.value;

const response = await fetch(
  "https://allseo.ir/website-analyzer/analyze/",
  {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({
      csrfmiddlewaretoken: csrfToken,
      suite: "general",
      url: "https://example.com",
    }),
  }
);

console.log(response.status);

const result = await response.text();

console.log(result);
const getCSRF = require("./csrf-token");

async function analyze(info) {
  try {
    const { csrfToken, cookie } = await getCSRF();

    const response = await fetch(
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
          suite: info.suite,
          url: info.url,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`خطایی رخ داده است.`);
    }

    const html = await response.text();

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

    if (canonicalMatch) {
      const reportUrl = canonicalMatch[1];
      return reportUrl;
    } else {
      console.log("آدرس صفحه نهایی پیدا نشد.");
    }

  } catch (error) {
    console.error(" خطا در اجرای ", error.message);
  }
}

module.exports = analyze
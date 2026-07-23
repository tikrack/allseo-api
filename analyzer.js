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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

    if (canonicalMatch) {
      return canonicalMatch[1];
    } else {
      throw new Error("Canonical URL not found in the response page.");
    }

  } catch (error) {
    throw new Error(`Analysis failed for ${info.url}: ${error.message}`);
  }
}

module.exports = analyze;

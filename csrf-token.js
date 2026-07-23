const BASE_URL = "https://allseo.ir";

async function getCSRF() {
  const response = await fetch(`${BASE_URL}/`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();

  const setCookieHeader = response.headers.get('set-cookie');
  
  const match = html.match(/name=["']csrfmiddlewaretoken["']\s+value=["']([^"']+)["']/i) || 
                html.match(/value=["']([^"']+)["']\s+name=["']csrfmiddlewaretoken["']/i);

  if (!match) {
    throw new Error("CSRF token not found");
  }

  const csrfToken = match[1];

  return {
    csrfToken,
    cookie: setCookieHeader
  };
}

module.exports = getCSRF;

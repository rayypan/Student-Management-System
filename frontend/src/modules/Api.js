export const SERVER_HOST = "http://localhost:8080";

/**
 * @param {"GET" | "POST" | "DELETE"} method
 * @param {string} url
 * @param {object} body
 * @param {string} token
 */
export async function fetchData(method, url, body = null, token = null) {
  method = method.toUpperCase();
  try {
    let response = null;
    if (method === "GET" || method === "DELETE") {
      response = fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
    } else
      response = fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
    const result = await response.json();
    if (!response.ok) {
      alert(response.message);
      return null;
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

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
      response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
    } else
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    const result = await response.json();
    if (!response.ok) {
      alert(response.message || `Response Error: ${response.status}`);
      return Promise.reject(
        response?.message || `Response Error: ${response.status}`
      );
    }
    return result;
  } catch (error) {
    console.error(error);
    return Promise.reject(error?.message || "Uncaught Exception");
  }
}

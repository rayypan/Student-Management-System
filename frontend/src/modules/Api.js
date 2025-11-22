import SERVER_ORIGIN from "../serverOrigin";

/**
 * @param {"GET" | "POST" | "DELETE"} method
 * @param {string} path
 * @param {object} body
 * @param {string|null} token
 */
export async function apiCall(method, path, body = null, token = null) {
  // @ts-ignore
  method = method.toUpperCase();
  if (!path.startsWith("/")) {
    throw new Error("path should start with '/'");
  }
  path = `http://${SERVER_ORIGIN}${path}`;
  try {
    let response = null;
    if (method === "GET" || method === "DELETE") {
      response = await fetch(path, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
    } else
      response = await fetch(path, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    const result = await response.json();
    if (!response.ok) {
      // alert(result?.message || `Response Error: ${response.status}`);
      return Promise.reject(
        result?.message || `Response Error: ${response.status}`
      );
    }
    return result;
  } catch (error) {
    console.error(error);
    return Promise.reject("Api Error");
  }
}

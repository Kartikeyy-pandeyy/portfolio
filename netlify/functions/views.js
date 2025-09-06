// netlify/functions/views.js
import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
  const store = getStore({ name: "counters" }); // shared namespace for your site
  const key = "heroViews";

  // Increment & return
  if (event.httpMethod === "POST") {
    // read current (strong read so you see latest after write)
    const current =
      (await store.get(key, { type: "json", consistency: "strong" })) ||
      { total: 0 };

    const next = { total: current.total + 1 };
    await store.setJSON(key, next); // write back

    // read strongly to return the fresh value
    const fresh = await store.get(key, { type: "json", consistency: "strong" });
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fresh),
    };
  }

  // Just return current total
  if (event.httpMethod === "GET") {
    const data =
      (await store.get(key, { type: "json", consistency: "strong" })) ||
      { total: 0 };
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};

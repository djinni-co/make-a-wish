const getBaseUrl = () => {
  // WHOOP-WHOOP: simplified version
  return "https://djinni.co/api";
};

export default {
  call: async (path, { headers, method, body, params } = {}, handleFetch) => {
    // handleFetch -- ssr fetch wrapper
    // if its null and we deal with browser --> use native fetch()
    // else skip
    if (!handleFetch && typeof fetch != "undefined") {
      handleFetch = fetch;
    }
    if (!handleFetch) return { error: "SSR fetch is not specified" };

    let url = new URL(`${getBaseUrl()}${path}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
    if (body) {
      body = JSON.stringify(body);
    }
    const response = await handleFetch(url, {
      headers: {
        "X-CSRFToken": "sometoken", // WHOOP-WHOOP
        "Content-Type": "application/json",
        ...headers,
      },
      method,
      body,
    });
    if (response.ok) {
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return { data };
    } else {
      return { error: response.status };
    }
  },
};

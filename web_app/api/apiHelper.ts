const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(
  method: string,
  endpoint: string,
  body: any = null,
  params = {}
) {
  const options = buildRequestOptions(method, body);
  const fullEndpoint = buildFullEndpoint(endpoint, params);
  try {
    const response = await fetch(`${SERVER_URL}${fullEndpoint}`, options);

    if (response.status === 401) {
      throw new Error("Unathorized");
    }

    const data = response.status !== 204 ? await response.json() : null;
    return {
      status: response.status,
      data,
      headers: response.headers,
    };
  } catch (error: any) {
    if (error.message === "Unathorized" && window.location.pathname !== "/") {
      window.location.href = "/";
    }

    return { status: "error", success: false };
  }
}

function buildRequestOptions(method: string, body: string) {
  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };
  const options: { method: string; headers: any; body?: any } = {
    method,
    headers,
  };
  const authToken = window.localStorage.getItem("authToken");

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  if (body) options.body = JSON.stringify(body);

  return options;
}

function buildFullEndpoint(endpoint: string, params: any) {
  const queryString = new URLSearchParams(params).toString();
  return `${endpoint}${queryString && `?${queryString}`}`;
}

export { request };

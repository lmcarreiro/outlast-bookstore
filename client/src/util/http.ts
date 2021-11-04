export async function getJson<T>(url: string, params?: Record<string, any>) {
  const query = (params && `?${new URLSearchParams(params).toString()}`) ?? "";

  const response = await fetch(url + query, { method: "GET" });
  const content = await response.json();

  return content as T;
}

export async function postJson<T>(url: string, data: Record<string, any> = {}) {
  const body = JSON.stringify(data);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const content = await response.json();

  return content as T;
}

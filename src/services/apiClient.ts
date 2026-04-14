export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  isNetworkError?: boolean;
}

async function request<T>(url: string, options: RequestInit): Promise<APIResponse<T>> {
  try {

    // Allow overriding API base URL or defaulting to a dummy relative path for now
    const fetchUrl = url.startsWith('http') ? url : `/api${url}`;

    const response = await fetch(fetchUrl, options);

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // Body not json, stick to statusText
      }
      return { success: false, error: errorMessage };
    }

    // 204 No Content shouldn't attempt to parse JSON
    if (response.status === 204) {
      return { success: true, data: {} as T };
    }

    const data: T = await response.json();
    return { success: true, data };

  } catch (err: any) {
    // Catch network-level drops (DNS, offline, CORS, server totally down)
    console.error('API Client Network Error:', err);
    // In JS fetch, a TypeError is generally a network error (e.g. failed to fetch)
    return {
      success: false,
      error: "We couldn't connect to the server due to a network error",
      isNetworkError: true
    };
  }
}

export const apiClient = {
  async get<T = any>(url: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    return request<T>(url, { ...options, method: 'GET' });
  },

  async post<T = any>(url: string, body: any, options: RequestInit = {}): Promise<APIResponse<T>> {
    return request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
  },

  request
};

export type ApiRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type ApiRequestOptions = {
  method?: ApiRequestMethod
  body?: unknown
  headers?: HeadersInit
}

const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`
}

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}) => {
  const response = await fetch(buildApiUrl(path), {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null as T
  }

  return (await response.json()) as T
}

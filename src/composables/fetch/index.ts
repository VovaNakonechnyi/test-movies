export const useCustomFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const resp = await fetch(`${url}`, {
    ...options
  })
  return await resp.json()
}

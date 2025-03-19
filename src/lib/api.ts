// lib/api.ts
export const fetchShop = async () => {
  const response = await fetch('/api/shop')
  return response.json()
}

export const fetchServices = async () => {
  const response = await fetch('/api/services')
  return response.json()
}

export const createService = async (serviceData: any) => {
  const response = await fetch('/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  })
  return response.json()
}

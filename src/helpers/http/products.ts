export const getProducts = async () => {
  const response: Response = await fetch('http://localhost:8080/api/products')
  return await response.json()
}

export const getProduct = async (id: number | string) => {
  const response: Response = await fetch(`http://localhost:8080/api/products/${id}`)

  return await response.json()
}

export const createProduct = async (data: object) => {
  const body = JSON.stringify(data)
  const response: Response = await fetch(`http://localhost:8080/api/products`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const updateProduct = async (id: number | string, data: object) => {
  const body = JSON.stringify(data)
  const response: Response = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: 'PATCH',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const deleteProduct = async (id: number | string) => {
  const response: Response = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: 'DELETE'
  })
  return await response.json()
}

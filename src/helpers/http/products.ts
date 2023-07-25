export const getProducts = async () => {
  const response: Response = await fetch('http://localhost:8080/api/products')
  return response.status === 200
    ? await response.json()
    : `${response.status} ${response.statusText}`
}

export const getProduct = async (id: number | string) => {
  const response: Response = await fetch(`http://localhost:8080/api/products/${id}`)
  return response.status === 200
    ? await response.json()
    : `${response.status} ${response.statusText}`
}

export const createProduct = async (data: object) => {
  const body = JSON.stringify(data)
  const response: Response = await fetch(`htpp://localhost/api/products`, {
    method: 'POST',
    body
  })
  return response.status === 201
    ? await response.json()
    : `${response.status} ${response.statusText}`
}

export const updateProduct = async (id: number | string, data: object) => {
  const body = JSON.stringify(data)
  const response: Response = await fetch(`http://localhost/api/products/${id}`, {
    method: 'PATCH',
    body
  })
  return response.status === 200
    ? await response.json()
    : `${response.status} ${response.statusText}`
}

export const deleteProduct = async (id: number | string) => {
  const response: Response = await fetch(`http://localhost/api/products/${id}`, {
    method: 'DELETE'
  })
  return response.status === 200
    ? await response.json()
    : `${response.status} ${response.statusText}`
}

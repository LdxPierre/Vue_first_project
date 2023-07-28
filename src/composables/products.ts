export const useProducts = () => {
  const API_URL = 'http://localhost:8080/api/products'

  const getProducts = () => {
    return fetch(API_URL).then((result) => result.json())
  }

  const getProduct = async (slug: string) => {
    return await (await fetch(`${API_URL}/${slug}`)).json()
  }

  const postProduct = async (data: {}) => {
    return fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/json'
      }
    }).then((result) => result.json())
  }

  const patchProduct = async (id: string, data: {}) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then((result) => result.json())
  }

  const putProduct = async (id: string, data: {}) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then((result) => result.json())
  }

  const deleteProduct = async (id: string) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then((result) => result.json())
  }

  return { getProducts, getProduct, postProduct, patchProduct, putProduct, deleteProduct }
}

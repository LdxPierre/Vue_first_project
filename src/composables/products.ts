import { ref } from 'vue'
import type { ProductInterface } from '@/types'

type Method =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'PATCH'
  | 'PUT'
  | 'get'
  | 'post'
  | 'delete'
  | 'patch'
  | 'put'

interface FetchOptions {
  method?: Method
  id?: string
  slug?: string
  newData?: {}
}

export const useFetchProducts = () => {
  const data = ref<ProductInterface[] | ProductInterface>([])
  const error = ref(null)
  const isLoading = ref(false)

  const fetchProducts = async ({ method = 'GET', id, slug, newData }: FetchOptions) => {
    const methodUpper = method?.toUpperCase()
    const pathSlug = methodUpper == 'GET' && slug ? slug : ''
    const pathId = methodUpper == 'DELETE' && id ? id : ''

    try {
      isLoading.value = true
      const response: Response = await fetch(
        `http://localhost:8080/api/products/${pathSlug}${pathId}`,
        {
          method: methodUpper,
          body: JSON.stringify(newData) ?? null,
          headers: {
            'Content-Type': 'Application/Json'
          }
        }
      )
      if (response.ok) {
        data.value = await response.json()
      } else {
        console.log(await response.json())
        throw new Error(await response.json())
      }
    } catch (e: any) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchProducts }
}

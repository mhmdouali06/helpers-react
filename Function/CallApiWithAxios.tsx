import axios from 'axios'
import ProgressBar from 'axios-progress-bar'

const API_ROUTE = 'https://api.vycap.fcpo.agency'

interface CallApiOptions {
  jsonLd?: any
  route: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  requiresAuth?: boolean
  body?: any
  formData?: boolean
}

export function UseCallApi() {
  const callApi = async ({
    route,
    method,
    requiresAuth = false,
    body,
    formData,
    jsonLd = false,
  }: CallApiOptions) => {
    let dataToSend: any = body
    const r = `${API_ROUTE}/${route}`
    const config: any = {}

    if (formData) {
      const formData = new FormData()
      for (const key in dataToSend) {
        if (Object.hasOwnProperty.call(dataToSend, key)) {
          if (Array.isArray(dataToSend[key])) {
            dataToSend[key].forEach((item, index) => {
              for (const itemKey in item) {
                if (Object.hasOwnProperty.call(item, itemKey)) {
                  if (Array.isArray(item[itemKey])) {
                    item[itemKey].forEach((nestedItem, nestedIndex) => {
                      for (const nestedItemKey in nestedItem) {
                        if (Object.hasOwnProperty.call(nestedItem, nestedItemKey)) {
                          formData.append(
                            `${key}[${index}][${itemKey}][${nestedIndex}][${nestedItemKey}]`,
                            nestedItem[nestedItemKey]
                          )
                        }
                      }
                    })
                  } else {
                    formData.append(`${key}[${index}][${itemKey}]`, item[itemKey])
                  }
                }
              }
            })
          } else {
            // Handle non-array values
            formData.append(key, dataToSend[key])
          }
        }
      }

      // Set the Content-Type header for the request
      config.headers = {
        'Content-Type': 'multipart/form-data',
      }
    }

    if (jsonLd) {
      config.headers = {
        Accept: 'application/ld+json',
      }
    }

    try {
      let response: any

      if (method === 'POST') {
        response = await axios.post(r, dataToSend, config)
      } else if (method === 'GET') {
        response = await axios.get(r, config)
      } else if (method === 'DELETE') {
        response = await axios.delete(r, config)
      } else if (method === 'PUT') {
        response = await axios.put(r, dataToSend, config)
      } else if (method === 'PATCH') {
        response = await axios.patch(r, dataToSend, config)
      }

      return response.data
    } catch (error) {
      throw error
    }
  }

  return callApi
}
// export const createFormData = (data: any) => {
//   const formData = new FormData()
//   // Convert the data object to a FormData object

//   return formData
// }

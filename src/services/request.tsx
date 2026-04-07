import axios, { AxiosRequestConfig } from "axios"


const request = (axiosOptions: AxiosRequestConfig) => {

  return axios(axiosOptions)
    .then((response) => {
      const { statusText, status, data } = response

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        data: data,
      })
    })
    .catch((error) => {
      const { response, message } = error

      return Promise.reject({
        success: false,
        statusCode: response?.status,
        message: message,
      })
    })
}

export default request

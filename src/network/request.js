import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 12000
  })

  return instance(config)
}
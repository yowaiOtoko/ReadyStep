
import { parseJwt, parsePropertiesToDate } from '../utils'
import { jwtConfig } from '../auth/jwtConfig'


const host = ''
const prependSlash = (url) => { return url.charAt(0) === '/' ? url : `/${url}`; }


export class http {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {

          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          const wasLogged = this.getToken()
          if (!wasLogged) {

            return Promise.reject(error)
          }
          localStorage.removeItem(this.jwtConfig.tokenUserKeyName)
          localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
          window.location = '/login'
          return
          //TODO handled refresh token
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // Update accessToken in localStorage
              this.setToken(r.data.token)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.token)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {

    try {
      return JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName))

    } catch (e) {}

    return null
  }

  getTokenData() {
    try {
      const token = JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName))
      return parseJwt(token)

    } catch (e) {}

    return null
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    const token = value ? value : null
    //localStorage.setItem(this.jwtConfig.storageTokenKeyName, token)
  }

  setRefreshToken(value) {
    const token = value ? value : null
    // localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, token)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }

  getBaseUrl() {
    return this.axiosIns.defaults.baseURL
  }


  get(url, {extractHydra = true, dateProperties = []} = {}) {

    return this.axiosIns.get(url).then(({data}) => {

      const isCollection = data['@type'] == 'hydra:Collection';
      if(isCollection && extractHydra){
        data = data['hydra:member'];
      }

      if(dateProperties.length > 0) {
        if(isCollection){
          data.forEach(d => parsePropertiesToDate(d, dateProperties))
        }else{
          data = parsePropertiesToDate(data, dateProperties)
        }
      }
      return data
    })

  }

  async post(url, data, options, throwOnError = true) {


    return this.axiosIns.post(url,data).then((response) => {

      if(throwOnError && response.status >= 400) {
        throw new Error(response.statusText);
      }

      return response.data;

    })
  }

  async put(url, data) {

    const response = await fetch(`${host}/${url}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();

    return resData;
  }

  async del(url) {

    const response = await fetch(`${host}/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    });

    return response;
  }


}

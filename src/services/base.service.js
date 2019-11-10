import Http from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export default class BaseService {
  constructor () {
    if (!this.entity) {
      throw new Error('Child service class not provide entity')
    }
  }

  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  request (status = { auth: false }) {
    return new Http(status)
  }

  responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }

  /**
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

  getAllCars (parameters = {}) {
    const params = {
      ...parameters
    }
   
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}`, { params })
        .then(response => {
         
          response.data.map((obj) => {
            obj.photo = 'https://live.staticflickr.com/65535/48973372111_cd2bc45cc5_c.jpg';
            obj.subTitle = 'Lorem ipsum dolor';
            obj.author = 'Aquiles Pinto'
            return obj;
          })

          resolve(this.responseWrapper(response, response.data))
        }).catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  getById (id) {
    
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}/${id}`)
      .then(response => {

          response.data.photo = 'https://live.staticflickr.com/65535/48973372111_cd2bc45cc5_c.jpg';
          response.data.subTitle = 'Lorem ipsum dolor';
          response.data.author = 'Aquiles Pinto' 

        resolve(this.responseWrapper(response, response.data))
      })
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

}

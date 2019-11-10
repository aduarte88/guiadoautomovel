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

  getListPublic (parameters = {}) {
    const params = {
      ...parameters
    }
    console.log("get list public");
    console.log(this.entity);
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}`, { params })
        .then(response => {
          console.log(response.data);

          response.data.map((obj) => {
            obj.photo = 'https://live.staticflickr.com/65535/48973372111_cd2bc45cc5_c.jpg';
            obj.subTitle = 'Lorem ipsum dolor';
            obj.author = 'Aquiles Pinto'
            // or via brackets
            // obj['total'] = 2;
            return obj;
        })

          let data = {
            //content: response.data.data.results,
            //total: response.data.data.total
          }
          resolve(this.responseWrapper(response, response.data))
        }).catch(error => {
          console.log("error");
          console.log(error);
          console.log("------");
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  getByIdPublic (id) {
    console.log("- ", id);
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}/${id}`)
      .then(response => {


          response.data.photo = 'https://live.staticflickr.com/65535/48973372111_cd2bc45cc5_c.jpg';
          response.data.subTitle = 'Lorem ipsum dolor';
          response.data.author = 'Aquiles Pinto'


      
       
        resolve(this.responseWrapper(response, response.data))
      })
        .catch(error => {
          console.log("error");
          console.log(error);
          console.log("------");
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */

  getById (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).get(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  create (data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).post(`${this.entity}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  update (id = window.required(), data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).patch(`${this.entity}/${id}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  remove (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).delete(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }
}

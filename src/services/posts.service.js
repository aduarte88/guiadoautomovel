import BaseService from './base.service'

class CarsService extends BaseService {
  get entity () {
    return 'posts'
  }
}

export default new CarsService()

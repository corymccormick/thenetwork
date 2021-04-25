import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SponsorsService {
  async getAds() {
    try {
      const res = await api.get('api/ads')
      AppState.ads = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}
export const sponsersService = new SponsorsService()

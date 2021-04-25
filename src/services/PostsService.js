import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts(page = 1) {
    try {
      const res = await api.get(`api/posts?page=${page}`)
      AppState.posts = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getPostById(id) {
    try {
      const res = await api.get('api/posts/' + id)
      AppState.posts = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}
export const postsService = new PostsService()

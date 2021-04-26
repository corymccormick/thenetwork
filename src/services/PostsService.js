import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import router from '../router'

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

  async createPost(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'Profile', params: { id: res.data.id } })
  }
  // async getNextPage() {
  //   try {
  //     const res = await api.get('api/posts?page=)
  //     AppState.posts = res.data
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }
}
export const postsService = new PostsService()

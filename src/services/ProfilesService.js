import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async getProfilePosts(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    AppState.posts = res.data
  }
}
export const profilesService = new ProfilesService()

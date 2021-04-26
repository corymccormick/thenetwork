<template>
  <div class="profile container fluid">
    <div class="row">
      <div class="col-md-8">
        <!--NOTE insert cover image <img class="bg" :src="state.profile.coverImg" alt="" /> -->
        <div class=" row card shadow">
          <img class="rounded-circle m-2" :src="state.profile.picture" alt="" />
          <p class="text-left ml-2">
            {{ state.profile.class }} <br />
            {{ state.profile.name }}
          </p>
          <p class="text-center">
            {{ state.profile.bio }}
          </p>
          <div class="col-12" v-if="state.account.id === state.profile.id">
            <form @submit.prevent="createPost">
              <div class="form-group">
                <label for="body">Post</label>
                <input type="text"
                       class="form-control"
                       name="body"
                       id="body"
                       aria-describedby="helpId"
                       placeholder="Post..."
                       v-model="state.createPost.body"
                >
                <label for="imgUrl">Image Url</label>
                <input type="text"
                       class="form-control"
                       name="imgUrl"
                       id="imgUrl"
                       aria-describedby="helpId"
                       placeholder="Image Url..."
                       v-model="state.createPost.imgUrl"
                >
              </div>
              <button class="btn btn-success" type="submit">
                Add Post
              </button>
            </form>
          </div>
          <div>
            <PostsDetails
              v-for="post in state.posts.posts"
              :key="post.id"
              :post="post"
            />
            <button v-if="state.account.id === state.profile.id">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <SponserDetails v-for="sponser in state.sponser" :key="sponser.title" :sponser="sponser" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { profilesService } from '../services/ProfilesService'
import { AppState } from '../AppState'
import { sponsersService } from '../services/SponsersService'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'

export default {
  name: 'Profile',

  setup() {
    const route = useRoute()
    const state = reactive({
      createPost: {},
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      sponser: computed(() => AppState.sponser),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
        await profilesService.getProfilePosts(route.params.id)
        await sponsersService.getAds(route.params.id)
      } catch (error) {

      }
    }
    )

    return {
      state,
      route,
      async createPost() {
        try {
          await postsService.createPost({ creatorId: route.params.id, ...state.createPost })
          state.createPost = {}
          Notification.toast('Added Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 200px;
  height: 200px;
}

p{
  font-size: 16pt;
}
</style>

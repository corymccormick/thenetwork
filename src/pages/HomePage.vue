<template>
  <div class="container-fluid">
    <div class="home row flex-grow-1 d-flex  justify-content-center">
      <div class="col-md-6">
        <PostsDetails @like-post="likePost" v-for="post in state.posts.posts" :key="post.id" :post="post" />
        <!-- v-if state.posts.newer add newer button -->
      </div>
      <div class="col-md-2">
        <SponserDetails
          v-for="sponser in state.sponser"
          :key="sponser.title"
          :sponser="sponser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { sponsersService } from '../services/SponsersService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      sponser: computed(() => AppState.sponser)
    })
    onMounted(async() => {
      try {
        // NOTE when making click handler make method here, pass value thru click handler
        await postsService.getPosts()
        await sponsersService.getAds()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async likePost(id) {
        try {
          await postsService.likePost(id)
          Notification.toast('Liked', 'success')
          await postsService.getPosts()
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>

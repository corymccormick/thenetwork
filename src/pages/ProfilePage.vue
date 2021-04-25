<template>
  <div class="profile container fluid">
    <div class="col-md-8 card shadow m-2">
    </div>
    <div class="card shadow">
      <!--NOTE insert cover image <img class="bg" :src="state.profile.coverImg" alt="" /> -->
      <img class="rounded-circle m-2" :src="state.profile.picture" alt="" />
      <p class="text-left ml-2">
        {{ state.profile.class }} <br />
        {{ state.profile.name }}
      </p>
      <p class="text-center">
        {{ state.profile.bio }}
      </p>
    </div>
    <PostsDetails v-for="post in state.posts.posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { profilesService } from '../services/ProfilesService'
import { AppState } from '../AppState'

export default {
  name: 'Profile',

  setup() {
    const route = useRoute()
    const state = reactive({
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts)
    })
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
        await profilesService.getProfilePosts(route.params.id)
      } catch (error) {

      }
    }
    )

    return {
      state
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

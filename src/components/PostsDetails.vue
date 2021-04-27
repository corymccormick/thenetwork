<template>
  <div class="row justify-content-center">
    <div class="postsDetails col-md">
      <div class=" card shadow m-2">
        <router-link :to="{name: 'Profile', params:{id: post.creator.id}}">
          <img class="d-flex justify-content-left rounded-circle m-2 avatar" :src="post.creator.picture" alt="" />
        </router-link>
        <p class="text-left ml-2">
          {{ post.creator.name }}
        </p>
        <div>
          <p class="text-center">
            {{ post.body }}
            <button v-if="state.account.id === post.creatorId" @click="deletePost(post.id)">
              Delete
            </button>
          </p>
          <img v-if="post.imgUrl" class="pic" :src="post.imgUrl" alt="" />
        </div>
        <div class="d-flex justify-text-left m-2">
          {{ dateString }}
        </div>
        <div class="text-right m-2">
          <button v-if="state.user.isAuthenticated" @click="$emit('like-post', post.id)">
            <font-awesome-icon :icon="myIcon" />  {{ post.likes.length }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'

export default {
  name: 'PostsDetails',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,

      async deletePost(id) {
        try {
          await postsService.deletePost(id)
          Notification.toast('Deleted Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['like-post'],
  computed: {
    dateString() {
      const postDateTime = new Date(this.post.createdAt)
      return postDateTime.toLocaleString()
    }
  },
  data() {
    return {
      myIcon: faHeart
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped lang="scss">
.pic {
  width: 400px;
  height: 200px;
}

.avatar{
  width: 50px;
  height: 50px;
}
</style>

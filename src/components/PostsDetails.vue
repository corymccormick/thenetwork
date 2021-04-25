<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="postsDetails col-8">
      <div class="card shadow m-2">
        <router-link :to="{name: 'Profile', params:{id: post.creator.id}}">
          <div class=" d-flex justify-content-left">
            <img class="rounded-circle m-2" :src="post.creator.picture" alt="" />
          </div>
        </router-link>
        <p class="text-left ml-2">
          {{ post.creator.name }}
        </p>
        <div>
          <p class="text-center">
            {{ post.body }}
          </p>
        </div>
        <div class="d-flex justify-text-left m-2">
          {{ dateString }}
        </div>
        <div class="text-right m-2">
          <font-awesome-icon :icon="myIcon" />  {{ post.likes.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'PostsDetails',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
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
img{
  width: 50px;
  height: 50px;
}
</style>

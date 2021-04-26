<template>
  <div class=" row sponser">
    <div class="card shadow m-2">
      <img :src="sponser.tall" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SponserDetails',
  props: {
    sponser: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">

</style>

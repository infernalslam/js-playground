<template>
  <div>
    <div v-for="(item, index) in terminal" :key="index">
      <span v-if="item.value"> ``` {{ item.id }} : {{ item.value }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['terminal']
}
</script>

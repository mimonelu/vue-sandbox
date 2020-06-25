<template>
  <menu class="top-view">
    <router-link to="/veditable">Veditable</router-link>
    <router-link to="/editable-tree">EditableTree</router-link>
  </menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TopView extends Vue {}
</script>

<style lang="scss" scoped>
.top-view {
  display: flex;
  flex-direction: column;
}
</style>

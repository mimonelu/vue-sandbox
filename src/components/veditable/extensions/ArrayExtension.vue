<template>
  <div class="veditable--array">
    <span>{{ value }}</span>
    <small>{{ suffix }}</small>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ArrayExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: false, default: 'items' })
  suffix?: string

  get value (): string {
    return this.cell.value.length
  }
}
</script>

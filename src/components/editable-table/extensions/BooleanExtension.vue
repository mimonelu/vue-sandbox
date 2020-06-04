<template>
  <input
    v-model="cell.value"
    type="checkbox"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean
}
</script>

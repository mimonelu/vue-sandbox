<template>
  <label class="veditable--boolean">
    <input
      v-model="cell.value"
      class="veditable__focusable-target"
      tabindex="-1"
      type="checkbox"
      :disabled="disabled"
      @keydown.enter="onKeyDownEnter"
    />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  onKeyDownEnter () {
    this.cell.value = !this.cell.value
  }
}
</script>

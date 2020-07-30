<template>
  <div class="veditable--button">
    <button
      :disabled="disabled"
      class="veditable__focusable-target"
      tabindex="-1"
      type="button"
      @click="click"
    >{{ label }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  label?: string

  @Prop({ required: true })
  disabled?: boolean

  @Emit('click')
  click () { /**/ }
}
</script>

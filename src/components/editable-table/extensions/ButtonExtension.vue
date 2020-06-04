<template>
  <button
    :disabled="disabled"
    @click="click"
  >{{ label }}</button>
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

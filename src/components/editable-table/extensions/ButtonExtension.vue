<template>
  <button @click="click">{{ label }}</button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  label?: string

  @Emit('click')
  click () { /**/ }
}
</script>

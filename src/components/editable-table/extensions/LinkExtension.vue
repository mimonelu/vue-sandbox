<template>
  <a
    :href="href"
    :target="target"
  >{{ label }}</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  href?: string

  @Prop({ required: false, default: '' })
  target?: string

  @Prop({ required: true })
  label?: string
}
</script>

<template>
  <div class="editable-table--link">
    <div v-if="disabled">{{ label || href }}</div>
    <a
      v-else
      :href="href"
      :target="target"
      class="editable-table__focusable-target"
      ref="link"
      tabindex="-1"
      @keydown.space.prevent="onKeyDownSpace"
    >{{ label || href }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  href?: string

  @Prop({ required: false, default: '' })
  target?: string

  @Prop({ required: false, default: '' })
  label?: string

  @Prop({ required: true })
  disabled?: boolean

  onKeyDownSpace () {
    (this.$refs.link as HTMLLinkElement).click()
  }
}
</script>

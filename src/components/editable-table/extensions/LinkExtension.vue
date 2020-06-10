<template>
  <div class="editable-table--link">
    <div v-if="disabled">{{ label || href }}</div>
    <a
      v-else
      :href="href"
      :target="target"
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
}
</script>

<style lang="scss">
.editable-table--link {
  padding: 0.25em 0.5em;

  & > a {
    color: #0080f0;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>

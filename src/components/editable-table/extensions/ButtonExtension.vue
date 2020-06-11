<template>
  <div class="editable-table--button">
    <button
      :disabled="disabled"
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

<style lang="scss">
.editable-table--button {
  padding: 0.25em 0.25em;

  & > button {
    display: block;
    font-family: "Arial";
    font-size: 1em;
    width: 100%;
    [data-is-disabled="false"] & {
      cursor: pointer;
    }
  }
}
</style>

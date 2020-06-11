<template>
  <div class="editable-table--text">
    <textarea
      v-model="cell.value"
      :readonly="disabled"
      rows="1"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  onFocus ($event: Event) {
    ($event.target as HTMLInputElement).select()
  }

  onInput ($event: Event) {
    if ($event.target) {
      const target = $event.target as HTMLElement
      target.style.width = 'auto'
      target.style.height = 'auto'
      target.style.width = `${target.scrollWidth}px`
      target.style.height = `${target.scrollHeight}px`
    }
  }
}
</script>

<style lang="scss">
.editable-table--text {
  height: 100%;

  & > textarea {
    appearance: none;
    background-color: transparent;
    border-style: none;
    display: block;
    font-family: "Arial"; // TODO:
    font-size: 1em;
    line-height: 1;
    overflow: hidden;
    outline: none;
    padding: 0.5em;
    resize: none;
    width: 100%;
    height: 100%;
    min-width: 6em; // TODO:
    white-space: nowrap;
    &[readonly="readonly"] {
      opacity: 0.5;
    }
  }
}
</style>

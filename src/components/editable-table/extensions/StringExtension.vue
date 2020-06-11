<template>
  <div class="editable-table--text">
    <input
      v-model="cell.value"
      :type="type"
      :readonly="disabled"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StringExtension extends Vue {
  @Prop({ required: true })
  type?: any

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
      target.style.width = `${target.scrollWidth}px`
    }
  }
}
</script>

<style lang="scss">
.editable-table--text {
  position: relative;
  height: 100%;

  & > input {
    appearance: none;
    background-color: transparent;
    border-style: none;
    box-sizing: border-box;
    display: block;
    font-family: "Arial"; // TODO:
    font-size: 1em;
    outline: none;
    padding: 0 0.5em;
    width: 100%;
    height: 100%;
    min-width: 6em; // TODO:
    &[readonly="readonly"] {
      opacity: 0.5;
    }
  }
}
</style>

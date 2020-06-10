<template>
  <div class="editable-table--select">
    <select
      v-model="cell.value"
      :disabled="disabled"
      @focus="onFocus"
    >
      <option
        v-for="option, optionIndex in options"
        :key="`option__${optionIndex}`"
        :value="option.value"
        :selected="option.value === cell.value"
      >{{ option.label }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  @Emit('focused')
  onFocus () { /**/ }
}
</script>

<style lang="scss">
.editable-table--select {
  position: relative;
  height: 100%;

  & > select {
    background-color: transparent;
    border-style: none;
    border-right: 0.5em solid transparent;
    box-sizing: border-box;
    display: block;
    font-family: "Arial"; // TODO:
    font-size: 1em;
    padding: 0 0 0 0.5em;
    width: 100%;
    height: 100%;
    min-width: 6em; // TODO:
    [data-is-disabled="false"] & {
      cursor: pointer;
    }
  }
}
</style>

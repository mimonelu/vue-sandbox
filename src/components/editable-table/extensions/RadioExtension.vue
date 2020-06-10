<template>
  <div class="editable-table--radio">
    <label
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="cell.value"
        type="radio"
        :value="option.value"
        :disabled="disabled"
      />{{ option.label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean
}
</script>

<style lang="scss">
.editable-table--radio {
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  height: 100%;

  & > label {
    display: flex;
    align-items: center;
    height: 100%;
    &:not(:last-child) {
      margin-right: 0.5em;
    }

    & > input {
      margin: 0 0.25em 0 0;
    }

    [data-is-disabled="false"] &,
    & > input:not([disabled="disabled"]) {
      cursor: pointer;
    }
  }
}
</style>

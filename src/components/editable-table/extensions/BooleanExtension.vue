<template>
  <label class="editable-table--boolean">
    <input
      v-model="cell.value"
      type="checkbox"
      :disabled="disabled"
    />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean
}
</script>

<style lang="scss">
.editable-table--boolean {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  [data-is-disabled="false"] & {
    cursor: pointer;
  }

  & > input {
    margin: 0;
  }
}
</style>

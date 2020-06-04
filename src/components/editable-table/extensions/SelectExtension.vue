<template>
  <select
    v-model="cell.value"
    :disabled="disabled"
  >
    <option
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
      :value="option.value"
      :selected="option.value === cell.value"
    >{{ option.label }}</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean
}
</script>

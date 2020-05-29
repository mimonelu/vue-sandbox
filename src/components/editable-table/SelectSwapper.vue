<template>
  <select>
    <option
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
      :value="option.value"
      :selected="option.value === value"
    >{{ option.label }}</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectSwapper extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  value?: any
}
</script>

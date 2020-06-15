<template>
  <div class="editable-table--select">
    <select
      v-model="cell.value"
      :disabled="disabled"
      ref="select"
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  mounted () {
    (this.$refs.select as HTMLSelectElement).focus()
  }
}
</script>

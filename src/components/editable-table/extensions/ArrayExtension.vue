<template>
  <div class="editable-table--array">
    <label
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
    ><input
        v-model="cell.value"
        tabindex="-1"
        type="checkbox"
        :value="option.value"
        :disabled="disabled"
      />{{ option.label }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ArrayExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean
}
</script>

<template>
  <div>
    <label
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="cell.value"
        type="checkbox"
        :value="option.value"
      />{{ option.label }}
    </label>
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
}
</script>

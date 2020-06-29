<template>
  <div class="veditable--radio">
    <label
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="cell.value"
        tabindex="-1"
        type="radio"
        :value="option.value"
        :disabled="disabled"
        @change="onChange"
      />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonExtension extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  @Emit('change')
  onChange () { /**/ }
}
</script>

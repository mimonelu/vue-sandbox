<template>
  <div>
    <label
      v-for="option, optionIndex in options"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="value[name]"
        type="checkbox"
        :value="option.value"
      />{{ option.label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CheckboxSwapper extends Vue {
  @Prop({ required: true })
  options?: any

  @Prop({ required: true })
  value?: any

  @Prop({ required: true })
  name?: string
}
</script>

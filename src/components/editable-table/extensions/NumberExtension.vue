<template>
  <div class="editable-table--text">
    <input
      v-model.number="cell.value"
      :type="type"
      :readonly="disabled"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NumberExtension extends Vue {
  @Prop({ required: true })
  type?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  onFocus ($event: Event) {
    ($event.target as HTMLInputElement).select()
  }

  onInput ($event: Event) {
    if ($event.target) {
      const target = $event.target as HTMLElement
      target.style.width = 'auto'
      target.style.width = `${target.scrollWidth}px`
    }
  }
}
</script>

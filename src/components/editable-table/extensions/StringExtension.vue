<template>
  <div class="editable-table--string">
    <input
      v-model="cell.value"
      :type="validType"
      :readonly="disabled"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StringExtension extends Vue {
  @Prop({ required: true })
  type?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  get validType (): string {
    return this.type === 'string' ? 'text' : this.type
  }

  onFocus ($event: Event) {
    ($event.target as HTMLInputElement).select()
  }

  onInput ($event: Event) {
    if ((this.type === 'number' || this.type === 'string') && $event.target) {
      const target = $event.target as HTMLElement
      target.style.width = 'auto'
      target.style.width = `${target.scrollWidth}px`
    }
  }
}
</script>

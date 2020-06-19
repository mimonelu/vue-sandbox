<template>
  <div class="editable-table--string">
    <input
      v-model.number="cell.value"
      :type="type"
      :readonly="disabled"
      ref="input"
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

  mounted () {
    this.onFocus()
  }

  onFocus () {
    (this.$refs.input as HTMLInputElement).select()
    this.onInput()
  }

  onInput () {
    const target = this.$refs.input as HTMLInputElement
    if (target) {
      target.style.width = 'auto'
      target.style.width = `${target.scrollWidth}px`
    }
  }
}
</script>

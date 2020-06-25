<template>
  <div class="veditable--text">
    <textarea
      v-model="cell.value"
      :readonly="disabled"
      ref="textarea"
      rows="1"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  disabled?: boolean

  mounted () {
    this.onFocus()
  }

  onFocus () {
    (this.$refs.textarea as HTMLInputElement).select()
    this.onInput()
  }

  onInput () {
    const target = this.$refs.textarea as HTMLInputElement
    if (target) {
      target.style.width = 'auto'
      target.style.height = 'auto'
      target.style.width = `${target.scrollWidth}px`
      target.style.height = `${target.scrollHeight}px`
    }
  }
}
</script>

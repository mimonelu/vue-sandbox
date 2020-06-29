<template>
  <div class="veditable--string">
    <input
      v-model="cell.value"
      :type="validType"
      :readonly="disabled"
      ref="input"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

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

  mounted () {
    this.onFocus()
  }

  @Emit('change')
  onChange () { /**/ }

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

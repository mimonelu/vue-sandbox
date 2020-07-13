<template>
  <div class="veditable--string">
    <input
      v-model="cell.value"
      :type="type"
      :list="listId"
      :readonly="disabled"
      ref="input"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    />
    <datalist
      v-if="list"
      :id="listId"
    >
      <option
        v-for="listValue, listIndex in list"
        :key="`${listId}--${listIndex}`"
        :value="listValue"
      />
    </datalist>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ListExtension extends Vue {
  @Prop({ required: true })
  type?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: false, default: null })
  list?: any

  @Prop({ required: false, default: null })
  listId?: string

  @Prop({ required: true })
  disabled?: boolean

  mounted () {
    this.onFocus()
  }

  @Emit('change')
  onChange () { /**/ }

  onFocus () {
    (this.$refs.input as HTMLInputElement).select()
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

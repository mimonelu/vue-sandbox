<template>
  <div class="editable-table--text">
    <!-- NOTICE: `v-model.number` のために処理を分岐している -->
    <input
      v-if="type === 'number'"
      v-model.number="cell.value"
      :type="type"
      :list="list ? listId : null"
      :readonly="disabled"
      @focus="onFocus"
    />
    <input
      v-else
      v-model="cell.value"
      :type="type"
      :list="list ? listId : null"
      :readonly="disabled"
      @focus="onFocus"
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextExtension extends Vue {
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

  onFocus ($event: Event) {
    ($event.target as HTMLInputElement).select()
  }
}
</script>

<style lang="scss">
.editable-table--text {
  position: relative;
  height: 100%;

  & > input {
    appearance: none;
    background-color: transparent;
    border-style: none;
    box-sizing: border-box;
    display: block;
    font-family: "Arial"; // TODO:
    font-size: 1em;
    padding: 0 0.5em;
    width: 100%;
    height: 100%;
    min-width: 6em; // TODO:
    &[readonly="readonly"] {
      opacity: 0.5;
    }
  }
}
</style>

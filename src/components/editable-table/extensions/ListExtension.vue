<template>
  <div class="editable-table--string">
    <input
      v-model="cell.value"
      :type="type"
      :list="listId"
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

  onFocus ($event: Event) {
    ($event.target as HTMLInputElement).select()
  }
}
</script>

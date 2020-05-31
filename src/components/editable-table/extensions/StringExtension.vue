<template>
  <div>
    <input
      v-model="cell.value"
      type="text"
      :list="list ? listId : null"
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
export default class StringExtension extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: false, default: null })
  list?: any

  @Prop({ required: false, default: null })
  listId?: string
}
</script>

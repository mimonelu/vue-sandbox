<template>
  <div>
    <!-- NOTICE: `v-model.number` のために処理を分岐している -->
    <input
      v-if="type === 'number'"
      v-model.number="cell.value"
      :type="type"
      :list="list ? listId : null"
    />
    <input
      v-else
      v-model="cell.value"
      :type="type"
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
export default class TextExtension extends Vue {
  @Prop({ required: true })
  type?: any

  @Prop({ required: true })
  cell?: any

  @Prop({ required: false, default: null })
  list?: any

  @Prop({ required: false, default: null })
  listId?: string
}
</script>

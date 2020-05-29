<template>
  <tr>
    <th v-if="numberOfLines">{{ row + 1 }}</th>
    <td
      v-for="bodyCell, bodyCellIndex of bodyRow"
      :key="`body__${row}__${bodyCellIndex}`"
      v-bind="bodyCell.attrs"
      :data-type="getValueType(bodyCell.value)"
    >
      <cell
        :body="bodyRow[bodyCellIndex]"
        :regulation="columnRegulations[bodyCellIndex]"
        :row="row"
        :column="bodyCellIndex"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Cell from '@/components/editable-table/Cell.vue'

@Component({
  components: {
    Cell,
  },
})
export default class Row extends Vue {
  @Prop({ required: true })
  bodyRow?: any

  @Prop({ required: true })
  columnRegulations?: any

  @Prop({ required: true })
  row?: number

  @Prop({ required: true })
  numberOfLines?: boolean

  getValueType (value: any): string {
    if (value == null) {
      return 'string'
    }
    if (Array.isArray(value)) {
      return 'array'
    }
    return typeof value
  }
}
</script>

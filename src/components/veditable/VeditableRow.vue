<template>
  <tr>
    <th
      v-if="isHeader"
      :data-column="0"
      :data-is-floating="'' + (floatingColumns > 0)"
    >{{ headerValue }}</th>
    <veditable-cell
      v-for="cell, columnIndex of columnsWithoutHeader"
      :key="columnIndex"
      :data-column="isHeader ? columnIndex + 1 : columnIndex"
      :cell="columnsWithoutHeader[columnIndex]"
      :regulation="columnRegulations[columnIndex]"
      :row-index="rowIndex"
      :column-index="columnIndex"
      :disabled="disabled"
      :floating="columnIndex < floatingColumns - 1"
      :is-last-row="isLastRow"
      :is-last-column="columnIndex === columnsWithoutHeader.length - 1"
      @cellClicked="onCellClicked"
      @cellEditing="onCellEditing"
      @lastCellLoaded.once="$emit('lastCellLoaded')"
    />
  </tr>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import VeditableCell from '@/components/veditable/VeditableCell.vue'

@Component({
  components: {
    VeditableCell,
  },
})
export default class VeditableRow extends Vue {
  @Prop({ required: true })
  columns!: any

  @Prop({ required: true })
  columnRegulations!: any

  @Prop({ required: true })
  rowIndex!: number

  @Prop({ required: true })
  numberOfLines!: boolean

  @Prop({ required: true })
  disabled!: boolean

  @Prop({ required: true })
  headerColumn!: number

  @Prop({ required: true })
  floatingColumns!: number

  @Prop({ required: true })
  isLastRow!: boolean

  get isHeader (): boolean {
    return this.numberOfLines || this.headerColumn >= 0
  }

  get headerValue (): any {
    return this.headerColumn >= 0 ? this.columns[this.headerColumn].value : this.rowIndex + 1
  }

  get columnsWithoutHeader (): any {
    return this.columns.filter((column: any, index: number): boolean => {
      return index !== this.headerColumn
    })
  }

  @Emit('cellClicked')
  onCellClicked (params: any) {
    return {
      x: params.x,
      y: params.y,
    }
  }

  @Emit('cellEditing')
  onCellEditing () { /**/ }
}
</script>

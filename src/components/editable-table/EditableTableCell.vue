<template>
  <td
    v-bind="cell.attrs"
    :data-type="valueType"
  >
    <template v-if="extension">
      <button-extension
        v-if="extension.type === 'button'"
        :label="extension.label || valueLabel"
        @click="extension.callback({ cell, row: rowIndex, column: columnIndex })"
      />
      <radio-extension
        v-else-if="extension.type === 'radio'"
        :options="extension.options"
        :cell="cell"
      />
      <select-extension
        v-else-if="extension.type === 'select'"
        :options="extension.options"
        :cell="cell"
      />
      <link-extension
        v-else-if="extension.type === 'link'"
        :href="cell.value"
        :target="extension.target"
        :label="extension.label || valueLabel"
      />
    </template>
    <boolean-extension
      v-else-if="valueType === 'boolean'"
      :cell="cell"
    />
    <string-extension
      v-else-if="valueType === 'string'"
      :cell="cell"
      :list="getProp('list')"
      :list-id="getProp('list') ? `list--${rowIndex}--${columnIndex}` : null"
    />
    <array-extension
      v-else-if="valueType === 'array'"
      :options="getProp('options')"
      :cell="cell"
    />
    <template v-else>{{ valueLabel }}</template>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArrayExtension from '@/components/editable-table/extensions/ArrayExtension.vue'
import BooleanExtension from '@/components/editable-table/extensions/BooleanExtension.vue'
import ButtonExtension from '@/components/editable-table/extensions/ButtonExtension.vue'
import LinkExtension from '@/components/editable-table/extensions/LinkExtension.vue'
import RadioExtension from '@/components/editable-table/extensions/RadioExtension.vue'
import SelectExtension from '@/components/editable-table/extensions/SelectExtension.vue'
import StringExtension from '@/components/editable-table/extensions/StringExtension.vue'

@Component({
  components: {
    ArrayExtension,
    BooleanExtension,
    ButtonExtension,
    LinkExtension,
    RadioExtension,
    SelectExtension,
    StringExtension,
  },
})
export default class EditableTableCell extends Vue {
  @Prop({ required: true })
  cell?: any

  @Prop({ required: true })
  regulation?: any

  @Prop({ required: true })
  rowIndex?: number

  @Prop({ required: true })
  columnIndex?: number

  get valueType (): string {
    const cell = this.cell
    if (cell.value == null) {
      return 'string'
    }
    if (Array.isArray(cell.value)) {
      return 'array'
    }
    return typeof cell.value
  }

  get valueLabel (): string {
    const cell = this.cell
    if (cell.filter !== null) {
      if (cell.filter !== undefined) {
        return cell.filter(cell.value)
      }
      const regulation = this.regulation
      if (regulation && regulation.filter) {
        return regulation.filter(cell.value)
      }
    }
    return cell.value
  }

  get extension (): any {
    const cell = this.cell
    if (cell && cell.extension) {
      return cell.extension
    }
    const regulation = this.regulation
    if (regulation && regulation.extension) {
      return regulation.extension
    }
    return null
  }

  getProp (name: string): any {
    const cell = this.cell
    if (cell && cell[name]) {
      return cell[name]
    }
    const regulation = this.regulation
    if (regulation && regulation[name]) {
      return regulation[name]
    }
    return null
  }
}
</script>

<template>
  <td
    v-bind="cell.attrs"
    :data-required-type="requiredValueType"
    :data-type-is-valid="'' + isTypeValid"
    :data-is-required="'' + isRequired"
    :data-is-empty="'' + isEmpty"
    :data-is-ruled="'' + isRuled"
    :data-is-disabled="'' + isDisabled"
    :data-is-focused="'' + isFocused"
    @click="cellOnClick"
  >
    <template v-if="extension">
      <button-extension
        v-if="extension.type === 'button'"
        :label="extension.label || valueLabel"
        :disabled="isDisabled"
        @click="extension.callback({ cell, row: rowIndex, column: columnIndex })"
        @focused="cellOnClick"
      />
      <radio-extension
        v-else-if="extension.type === 'radio'"
        :options="extension.options"
        :cell="cell"
        :disabled="isDisabled"
        @focused="cellOnClick"
      />
      <select-extension
        v-else-if="extension.type === 'select'"
        :options="extension.options"
        :cell="cell"
        :disabled="isDisabled"
        @focused="cellOnClick"
      />
      <link-extension
        v-else-if="extension.type === 'link'"
        :href="cell.value"
        :target="extension.target"
        :label="extension.label || valueLabel"
        :disabled="isDisabled"
        @focused="cellOnClick"
      />
    </template>
    <boolean-extension
      v-else-if="requiredValueType === 'boolean'"
      :cell="cell"
      :disabled="isDisabled"
      @focused="cellOnClick"
    />
    <array-extension
      v-else-if="requiredValueType === 'array'"
      :options="getProp('options')"
      :cell="cell"
      :disabled="isDisabled"
      @focused="cellOnClick"
    />
    <text-extension
      v-else
      :type="requiredValueType"
      :cell="cell"
      :list="getProp('list')"
      :list-id="getProp('list') ? `list--${rowIndex}--${columnIndex}` : null"
      :disabled="isDisabled"
      @focused="cellOnClick"
    />
  </td>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import ArrayExtension from '@/components/editable-table/extensions/ArrayExtension.vue'
import BooleanExtension from '@/components/editable-table/extensions/BooleanExtension.vue'
import ButtonExtension from '@/components/editable-table/extensions/ButtonExtension.vue'
import LinkExtension from '@/components/editable-table/extensions/LinkExtension.vue'
import RadioExtension from '@/components/editable-table/extensions/RadioExtension.vue'
import SelectExtension from '@/components/editable-table/extensions/SelectExtension.vue'
import TextExtension from '@/components/editable-table/extensions/TextExtension.vue'
import { TObject } from '@/components/editable-table/types'

const stringTypes: TObject = {
  date: true,
  'datetime-local': true,
  email: true,
  month: true,
  password: true,
  search: true,
  tel: true,
  time: true,
  url: true,
  week: true,
}

@Component({
  components: {
    ArrayExtension,
    BooleanExtension,
    ButtonExtension,
    LinkExtension,
    RadioExtension,
    SelectExtension,
    TextExtension,
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

  @Prop({ required: true })
  disabled?: boolean

  @Prop({ required: true })
  focusedRowIndex?: number

  @Prop({ required: true })
  focusedColumnIndex?: number

  get currentValueType (): string {
    const cell = this.cell
    if (cell.value == null) {
      return 'string'
    }
    if (Array.isArray(cell.value)) {
      return 'array'
    }
    return typeof cell.value
  }

  get requiredValueType (): string {
    const cell = this.cell
    if (cell.type != null) {
      return cell.type
    }
    const regulation = this.regulation
    if (regulation && regulation.type != null) {
      return regulation.type
    }
    return 'string'
  }

  get isTypeValid (): boolean {
    if (stringTypes[this.requiredValueType] === true) {
      return this.currentValueType === 'string'
    }
    return this.currentValueType === this.requiredValueType
  }

  get isRequired (): boolean {
    const cell = this.cell
    if (cell.required != null) {
      return cell.required
    }
    const regulation = this.regulation
    if (regulation && regulation.required != null) {
      return regulation.required
    }
    return false
  }

  get isEmpty (): boolean {
    const cell = this.cell
    return cell.value == null || cell.value === ''
  }

  get isRuled (): boolean {
    const rule = this.getProp('rule')
    if (rule != null) {
      return rule(this.cell.value)
    }
    return true
  }

  get isDisabled (): boolean {
    if (this.disabled) {
      return true
    }
    const cell = this.cell
    if (cell.disabled != null) {
      return cell.disabled
    }
    const regulation = this.regulation
    if (regulation && regulation.disabled != null) {
      return regulation.disabled
    }
    return false
  }

  get isFocused (): boolean {
    return this.rowIndex === this.focusedRowIndex && this.columnIndex === this.focusedColumnIndex
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

  @Emit('cellOnClick')
  cellOnClick () {
    const element = this.$el.querySelector('a, button') as HTMLElement
    if (element) {
      element.focus()
    }

    return {
      rowIndex: this.rowIndex,
      columnIndex: this.columnIndex,
    }
  }
}
</script>

<template>
  <td
    v-bind="cell.attrs"
    :data-required-type="requiredValueType"
    :data-type-is-valid="'' + isTypeValid"
    :data-is-required="'' + isRequired"
    :data-is-empty="'' + isEmpty"
    :data-is-ruled="'' + isRuled"
    :data-is-disabled="'' + isDisabled"
    :data-is-floating="'' + floating"
    :data-is-focused="'' + focused"
    :data-is-editing="'' + editing"
    @click="onClick"
    @dblclick="onDoubleClick"
  >
    <array-extension
      v-if="requiredValueType === 'array' && !extension"
      :cell="cell"
      :suffix="getProp('suffix')"
    />
    <boolean-extension
      v-else-if="requiredValueType === 'boolean'"
      :cell="cell"
      :disabled="isDisabled"
    />
    <button-extension
      v-else-if="extension && extension.type === 'button'"
      :label="extension.label || valueLabel"
      :disabled="isDisabled"
      @click="extension.callback({ cell, row: rowIndex, column: columnIndex })"
    />
    <checkbox-extension
      v-else-if="extension && extension.type === 'checkbox'"
      :options="extension.options"
      :cell="cell"
      :disabled="isDisabled"
    />
    <radio-extension
      v-else-if="extension && extension.type === 'radio'"
      :options="extension.options"
      :cell="cell"
      :disabled="isDisabled"
    />
    <link-extension
      v-else-if="extension && extension.type === 'link'"
      :href="cell.value"
      :target="extension.target"
      :label="extension.label || valueLabel"
      :disabled="isDisabled"
    />
    <template v-else-if="focused && editing">
      <list-extension
        v-if="extension && extension.type === 'list'"
        :type="requiredValueType"
        :cell="cell"
        :list="extension.options"
        :list-id="`list--${rowIndex}--${columnIndex}`"
        :disabled="isDisabled"
      />
      <select-extension
        v-else-if="extension && extension.type === 'select'"
        :options="extension.options"
        :cell="cell"
        :disabled="isDisabled"
      />
      <number-extension
        v-else-if="requiredValueType === 'number'"
        :type="requiredValueType"
        :cell="cell"
        :disabled="isDisabled"
      />
      <text-extension
        v-else-if="requiredValueType === 'string' && getProp('multiline')"
        :cell="cell"
        :disabled="isDisabled"
      />
      <string-extension
        v-else
        :type="requiredValueType"
        :cell="cell"
        :disabled="isDisabled"
      />
    </template>
    <div
      v-else
      class="veditable--label"
    >{{ valueLabel }}</div>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArrayExtension from '@/components/veditable/extensions/ArrayExtension.vue'
import BooleanExtension from '@/components/veditable/extensions/BooleanExtension.vue'
import ButtonExtension from '@/components/veditable/extensions/ButtonExtension.vue'
import CheckboxExtension from '@/components/veditable/extensions/CheckboxExtension.vue'
import LinkExtension from '@/components/veditable/extensions/LinkExtension.vue'
import ListExtension from '@/components/veditable/extensions/ListExtension.vue'
import NumberExtension from '@/components/veditable/extensions/NumberExtension.vue'
import RadioExtension from '@/components/veditable/extensions/RadioExtension.vue'
import SelectExtension from '@/components/veditable/extensions/SelectExtension.vue'
import StringExtension from '@/components/veditable/extensions/StringExtension.vue'
import TextExtension from '@/components/veditable/extensions/TextExtension.vue'
import { TObject } from '@/components/veditable/types'

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
    CheckboxExtension,
    LinkExtension,
    ListExtension,
    NumberExtension,
    RadioExtension,
    SelectExtension,
    StringExtension,
    TextExtension,
  },
})
export default class VeditableCell extends Vue {
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
  floating?: boolean

  @Prop({ required: true })
  isLastRow?: boolean

  @Prop({ required: true })
  isLastColumn?: boolean

  editing = false

  focused = false

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

  get valueLabel (): string {
    const cell = this.cell
    const extension = this.extension
    const value = (extension && extension.type === 'select') ? this.getSelectLabel(extension.options, cell.value) : cell.value
    if (cell.filter !== null) {
      if (cell.filter !== undefined) {
        return cell.filter(value)
      }
      const regulation = this.regulation
      if (regulation && regulation.filter) {
        return regulation.filter(value)
      }
    }
    return value
  }

  getSelectLabel (options: any, value: any): string {
    for (let i = 0; i < options.length; i ++) {
      if (options[i].value === value) {
        return options[i].label
      }
    }
    return ''
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

  mounted () {
    if (this.isLastRow && this.isLastColumn) {
      this.$emit('lastCellLoaded')
    }
  }

  // TODO: 要リファクタリング
  canEdit (): boolean {
    return (!this.extension || this.extension.type === 'select' || this.extension.type === 'list') && this.requiredValueType !== 'array' && this.requiredValueType !== 'boolean'
  }

  onClick () {
    if (!this.focused) {
      this.focused = true
      this.$emit('cellClicked', {
        x: this.columnIndex,
        y: this.rowIndex,
      })
    }
  }

  onDoubleClick () {
    if (this.canEdit()) {
      this.editing = true
    }
  }
}
</script>

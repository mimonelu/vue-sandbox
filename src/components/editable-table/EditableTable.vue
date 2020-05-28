<template>
  <div class="editable-table">
    <table>
      <thead v-if="headers.length > 0">
        <tr
          v-for="headerRow, headerRowIndex of headers"
          :key="`header__${headerRowIndex}`"
        >
          <th
            v-if="numberOfLines && headerRowIndex === 0"
            :rowspan="headers.length"
          />
          <th
            v-for="headerCell, headerCellIndex of headerRow"
            :key="`header__${headerRowIndex}__${headerCellIndex}`"
            v-bind="headerCell.attrs"
          >
            {{ headerCell.value }}
          </th>
        </tr>
      </thead>
      <tbody v-if="bodies.length > 0">
        <tr
          v-for="bodyRow, bodyRowIndex of bodies"
          :key="`body__${bodyRowIndex}`"
        >
          <th v-if="numberOfLines">{{ bodyRowIndex + 1 }}</th>
          <td
            v-for="bodyCell, bodyCellIndex of bodyRow"
            :key="`body__${bodyRowIndex}__${bodyCellIndex}`"
            v-bind="bodyCell.attrs"
          >
            <!-- TODO: コンポーネント化すること -->
            <button
              v-if="hasSwapper(bodyRowIndex, bodyCellIndex, 'button')"
              @click="getSwapper(bodyRowIndex, bodyCellIndex).callback(bodyCell, bodyRowIndex, bodyCellIndex)"
            >{{ getSwapper(bodyRowIndex, bodyCellIndex).label || toValue(bodyRowIndex, bodyCellIndex) }}</button>
            <select v-else-if="hasSwapper(bodyRowIndex, bodyCellIndex, 'select')">
              <option
                v-for="option, optionIndex in getSwapper(bodyRowIndex, bodyCellIndex).options"
                :key="`option__${optionIndex}`"
                :value="option.value"
                :selected="bodyCell.value === option.value"
              >{{ option.label }}</option>
            </select>
            <a
              v-else-if="hasSwapper(bodyRowIndex, bodyCellIndex, 'link')"
              :href="bodyCell.value"
              :target="getSwapper(bodyRowIndex, bodyCellIndex).target"
            >{{ getSwapper(bodyRowIndex, bodyCellIndex).label || toValue(bodyRowIndex, bodyCellIndex) }}</a>
            <template v-else>{{ toValue(bodyRowIndex, bodyCellIndex) }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EditableTable extends Vue {
  @Prop({ required: false, default: () => ([]) })
  headers: any

  @Prop({ required: false, default: () => ([]) })
  bodies: any

  @Prop({ required: false, default: () => ([]) })
  columnRegulations: any

  @Prop({ required: false, default: true })
  numberOfLines?: boolean

  // TODO: リファクタリングすること。順番に気を付ける
  hasSwapper (y: number, x: number, type: string): boolean {
    if (this.bodies[y][x]) {
      if (this.bodies[y][x].swapper === null) {
        return false
      }
      if (this.bodies[y][x].swapper !== undefined && this.bodies[y][x].swapper.type === type) {
        return true
      }
    }
    if (!this.bodies[y][x].swapper && this.columnRegulations[x] && this.columnRegulations[x].swapper && this.columnRegulations[x].swapper.type === type) {
      return true
    }
    return false
  }

  getSwapper (y: number, x: number): any {
    if (this.bodies[y][x] && this.bodies[y][x].swapper) {
      return this.bodies[y][x].swapper
    }
    if (this.columnRegulations[x] && this.columnRegulations[x].swapper) {
      return this.columnRegulations[x].swapper
    }
    return null
  }

  toValue (y: number, x: number): string {
    if (this.bodies[y][x].filter !== null) {
      if (this.bodies[y][x].filter !== undefined) {
        return this.bodies[y][x].filter(this.bodies[y][x].value)
      }
      if (this.columnRegulations[x] && this.columnRegulations[x].filter) {
        return this.columnRegulations[x].filter(this.bodies[y][x].value)
      }
    }
    return this.bodies[y][x].value
  }
}
</script>

<style lang="scss" scoped>
.editable-table {
  $border-color: #c0c0c0 !default;
  font-size: 1rem;

  & > table {
    border-collapse: collapse;

    th, td {
      border: 1px solid $border-color;
      padding: 0.25em 0.5em;
    }

    th {
      background-color: #f0f0f0;
    }
  }
}
</style>

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
          >{{ headerCell.value }}</th>
        </tr>
      </thead>
      <tbody v-if="bodies.length > 0">
        <template v-for="bodyRow, bodyRowIndex of bodies">
          <row
            :key="`body__${bodyRowIndex}`"
            :body-row="bodyRow"
            :column-regulations="columnRegulations"
            :row="bodyRowIndex"
            :number-of-lines="numberOfLines"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Row from '@/components/editable-table/Row.vue'

@Component({
  components: {
    Row,
  },
})
export default class EditableTable extends Vue {
  @Prop({ required: false, default: () => ([]) })
  headers: any

  @Prop({ required: false, default: () => ([]) })
  bodies: any

  @Prop({ required: false, default: () => ([]) })
  columnRegulations: any

  @Prop({ required: false, default: true })
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

<style lang="scss">
.editable-table {
  $border-color: #c0c0c0 !default;
  font-size: 1rem;

  & > table {
    border-collapse: collapse;

    & > thead,
    & > tbody {
      & > tr {
        &:hover {
          background-color: #f0f0f0;
        }

        & > th,
        & > td {
          border: 1px solid $border-color;
          padding: 0.25em 0.5em;
          white-space: pre;
        }

        & > th {
          background-color: #f0f0f0;
        }

        & > td {
          &[data-type="boolean"] {
            text-align: center;
          }
          &[data-type="number"] {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>

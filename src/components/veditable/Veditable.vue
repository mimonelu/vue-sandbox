<template>
  <div
    class="veditable"
    :data-is-floating-thead="'' + floatingThead"
    :data-floating-columns="floatingColumns"
    :data-is-focused="'' + pseudoFocused"
  >
    <table>
      <thead v-if="headers.length > 0">
        <tr
          v-for="headerRow, headerRowIndex of headers"
          :key="`header__${headerRowIndex}`"
        >
          <th
            v-if="numberOfLines"
            class="veditable__corner"
            :data-column="0"
            :data-is-floating="'' + (floatingColumns > 0)"
          />
          <th
            v-for="headerCell, headerCellIndex of headerRow"
            :key="`header__${headerRowIndex}__${headerCellIndex}`"
            v-bind="headerCell.attrs"
            :data-column="numberOfLines ? headerCellIndex + 1 : headerCellIndex"
            :data-is-floating="headerCellIndex < floatingColumns - 1"
          >{{ headerCell.value }}</th>
        </tr>
      </thead>
      <tbody v-if="bodies.length > 0">
        <veditable-row
          v-for="bodyRow, bodyRowIndex of bodies"
          :key="bodyRowIndex"
          :columns="bodyRow"
          :column-regulations="columnRegulations"
          :row-index="bodyRowIndex"
          :number-of-lines="numberOfLines"
          :disabled="disabled"
          :floatingColumns="floatingColumns"
          :is-last-row="bodyRowIndex === bodies.length - 1"
          @cellClicked="onCellClicked"
          @lastCellLoaded.once="onLastCellLoaded"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VeditableRow from '@/components/veditable/VeditableRow.vue'

@Component({
  components: {
    VeditableRow,
  },
})
export default class Veditable extends Vue {
  @Prop({ required: false, default: () => ([]) })
  headers: any

  @Prop({ required: false, default: () => ([]) })
  bodies: any

  @Prop({ required: false, default: () => ([]) })
  columnRegulations: any

  @Prop({ required: false, default: false })
  disabled?: boolean

  @Prop({ required: false, default: true })
  floatingThead?: boolean

  @Prop({ required: false, default: 1 })
  floatingColumns?: number

  @Prop({ required: false, default: true })
  numberOfLines?: boolean

  @Prop({ required: false, default: () => ({ x: 0, y: 0 }) })
  focus: any

  @Prop({ required: false, default: false })
  focused?: boolean

  pseudoFocused? = false

  lastCellLoaded = false

  mounted () {
    window.addEventListener('click', this.onClick, false)
    window.addEventListener('keydown', this.onKeyDown, false)
  }

  onCellClicked (params: any) {
    this.setFocus(params.x, params.y)
  }

  onLastCellLoaded () {
    if (!this.lastCellLoaded) {
      this.lastCellLoaded = true
      this.pseudoFocused = this.focused
      if (this.pseudoFocused) {
        this.setFocus(this.focus.x, this.focus.y)
      }
    }
  }

  onClick (event: MouseEvent) {
    const target = event.target as HTMLElement
    this.pseudoFocused = target.closest('.veditable') === this.$el
    if (this.pseudoFocused && target.closest('td') === null) {
      this.setFocus(this.focus.x, this.focus.y)
    }
  }

  onKeyDown (event: KeyboardEvent) {
    if (!this.pseudoFocused) {
      return
    }
    const currentCell = Vue.prototype.$currentCell
    const editing = !currentCell || currentCell.editing
    if (!event.isComposing) {
      switch (event.key) {
        case 'Tab': {
          if (currentCell && currentCell.editing) {
            currentCell.editing = false
          }
          this.addFocus(event.shiftKey ? - 1 : 1, 0)
          event.preventDefault()
          break
        }
      }
    }
    if (event.altKey || event.ctrlKey || event.shiftKey) {
      return
    }
    if (!editing) {
      switch (event.key) {
        case 'ArrowUp': {
          if (event.metaKey) {
            this.setFocusToTop()
          } else {
            this.addFocus(0, - 1)
          }
          event.preventDefault()
          break
        }
        case 'ArrowRight': {
          if (event.metaKey) {
            this.setFocusToRight()
          } else {
            this.addFocus(1, 0)
          }
          event.preventDefault()
          break
        }
        case 'ArrowDown': {
          if (event.metaKey) {
            this.setFocusToBottom()
          } else {
            this.addFocus(0, 1)
          }
          event.preventDefault()
          break
        }
        case 'ArrowLeft': {
          if (event.metaKey) {
            this.setFocusToLeft()
          } else {
            this.addFocus(- 1, 0)
          }
          event.preventDefault()
          break
        }
        case 'Enter':
        case 'F2':
        case ' ': {
          if (currentCell && currentCell.canEdit()) {
            currentCell.editing = true
            event.preventDefault()
          }
          break
        }
      }
    } else {
      if (!event.isComposing) {
        switch (event.key) {
          case 'Enter': {
            if (currentCell) {
              currentCell.editing = false
              event.preventDefault()
            }
            break
          }
          case 'Escape': {
            if (currentCell) {
              currentCell.editing = false
              event.preventDefault()
            }
            break
          }
        }
      }
    }
  }

  setFocus (x: number, y: number) {
    if (this.$children[y] && this.$children[y].$children[x]) {
      if (Vue.prototype.$currentCell) {
        Vue.prototype.$currentCell.editing = false
        Vue.prototype.$currentCell.focused = false
      }
      Vue.prototype.$currentCell = this.$children[y].$children[x]
      Vue.prototype.$currentCell.focused = true
      this.scrollIntoView(Vue.prototype.$currentCell.$el)
      if (document.activeElement) {
        (document.activeElement as HTMLInputElement).blur()
      }
      const focusableTarget = Vue.prototype.$currentCell.$el.querySelector('.veditable__focusable-target') as HTMLInputElement
      if (focusableTarget) {
        focusableTarget.focus()
      }
      this.focus.x = x
      this.focus.y = y
    }
  }

  scrollIntoView (target: HTMLElement) {
    const tbody = this.$el.querySelector('tbody')
    if (tbody !== null) {
      const cells = Array.from(tbody.querySelectorAll('tr:first-child  > *'))
      if (cells) {
        let stickyWidth = 0
        cells.some((cell: any) => {
          const styles = window.getComputedStyle(cell)
          if (styles.position === 'sticky') {
            stickyWidth += cell.clientWidth
            return false
          }
          return true
        })
        if (target.offsetLeft < this.$el.scrollLeft + stickyWidth) {
          this.$el.scrollLeft = target.offsetLeft - stickyWidth
        } else if (target.offsetLeft + target.clientWidth > this.$el.scrollLeft + this.$el.clientWidth) {
          this.$el.scrollLeft = target.offsetLeft + target.clientWidth - this.$el.clientWidth
        }
      }
      const thead = this.$el.querySelector('thead')
      const theadHeight = thead !== null ? thead.clientHeight : 0
      if (target.offsetTop < this.$el.scrollTop + theadHeight) {
        this.$el.scrollTop = target.offsetTop - theadHeight
      } else if (target.offsetTop + target.clientHeight > this.$el.scrollTop + this.$el.clientHeight) {
        this.$el.scrollTop = target.offsetTop + target.clientHeight - this.$el.clientHeight
      }
    }
  }

  setFocusToTop () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(Vue.prototype.$currentCell.columnIndex, 0)
    }
  }

  setFocusToRight () {
    if (Vue.prototype.$currentCell) {
      const y = Vue.prototype.$currentCell.rowIndex
      if (this.$children[y]) {
        this.setFocus(this.$children[y].$children.length - 1, y)
      }
    }
  }

  setFocusToBottom () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(Vue.prototype.$currentCell.columnIndex, this.$children.length - 1)
    }
  }

  setFocusToLeft () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(0, Vue.prototype.$currentCell.rowIndex)
    }
  }

  addFocus (addingX: number, addingY: number) {
    if (Vue.prototype.$currentCell) {
      const x = Vue.prototype.$currentCell.columnIndex + addingX
      const y = Vue.prototype.$currentCell.rowIndex + addingY
      this.setFocus(x, y)
    }
  }
}
</script>

<style lang="scss">
@import "@/components/veditable/styles/veditable";
</style>

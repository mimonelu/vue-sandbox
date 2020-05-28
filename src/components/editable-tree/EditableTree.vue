<template>
  <div class="editable-tree">
    <editable-tree-children
      :source="source"
      @addParent="addParent"
      @addChild="addChild"
      @moveUp="moveUp"
      @moveDown="moveDown"
      @remove="remove"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableTreeChildren from '@/components/editable-tree/EditableTreeChildren.vue'

@Component({
  components: {
    EditableTreeChildren,
  },
})
export default class EditableTree extends Vue {
  @Prop({ required: true })
  source: any

  private serial = 0

  created () {
    this.updateChildren(this.source.children)
  }

  updateChildren (children: any) {
    for (let i = 0; i < children.length; i ++) {
      const child = children[i]
      if (child.id == null) {
        child.id = this.serial ++
      }
      if (child.closed == null) {
        this.$set(child, 'closed', false)
      }
      if (child.children != null) {
        this.updateChildren(child.children)
      }
    }
  }

  addParent (id: number) {
    if (id === - 1) {
      this.addParentToChild(this.source.children)
    } else {
      const { child } = this.findById(this.source, this.source.children, id)
      this.addParentToChild(child.children)
    }
  }

  addChild (id: number) {
    if (id === - 1) {
      this.addChildToChild(this.source.children)
    } else {
      const { child } = this.findById(this.source, this.source.children, id)
      this.addChildToChild(child.children)
    }
  }

  moveUp (id: number) {
    const { parent, index } = this.findById(this.source, this.source.children, id)
    if (parent.children[index - 1] != null) {
      parent.children.splice(index - 1, 2, parent.children[index], parent.children[index - 1])
    }
  }

  moveDown (id: number) {
    const { parent, index } = this.findById(this.source, this.source.children, id)
    if (parent.children[index + 1] != null) {
      parent.children.splice(index, 2, parent.children[index + 1], parent.children[index])
    }
  }

  remove (id: number) {
    const { parent, index } = this.findById(this.source, this.source.children, id)
    parent.children.splice(index, 1)
  }

  findById (parent: any, children: any, id: number): any {
    for (let i = 0; i < children.length; i ++) {
      const child = children[i]
      if (child.id === id) {
        return { parent, child, index: i }
      }
      if (child.children != null) {
        const result = this.findById(child, child.children, id)
        if (result !== null) {
          return result
        }
      }
    }
    return null
  }

  addParentToChild (children: any) {
    children.push({
      id: this.serial ++,
      label: '新しいフォルダ',
      added: true,
      closed: false,
      children: [],
    })
    // children.sort(this.sortChildren)
  }

  addChildToChild (children: any) {
    children.push({
      id: this.serial ++,
      label: '新しいノード',
      added: true,
      closed: false,
    })
    // children.sort(this.sortChildren)
  }

  sortChildren (a: any, b: any) {
    if (a.children != null && b.children == null) {
      return - 1
    } else if (a.children == null && b.children != null) {
      return 1
    }
    return 0
  }
}
</script>

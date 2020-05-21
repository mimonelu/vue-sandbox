<template>
  <div class="editable-tree">
    <editable-tree-child
      :source="source"
      @addParent="addParent"
      @addChild="addChild"
      @remove="remove"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableTreeChild from '@/components/EditableTreeChild.vue'

@Component({
  components: {
    EditableTreeChild,
  },
})
export default class EditableTree extends Vue {
  @Prop({ required: true })
  source: any

  private serial = 0

  created () {
    this.updateIdAll()
  }

  updateIdAll () {
    this.serial = 0
    this.updateId(this.source.children)
  }

  updateId (children: any) {
    for (let i = 0; i < children.length; i ++) {
      const child = children[i]
      child.id = this.serial ++
      if (child.children != null) {
        this.updateId(child.children)
      }
    }
  }

  addParent (id: number) {
    this.traverse('add-parent', this.source, this.source.children, id)
  }

  addChild (id: number) {
    this.traverse('add-child', this.source, this.source.children, id)
  }

  remove (id: number) {
    this.traverse('remove', this.source, this.source.children, id)
  }

  traverse (action: string, parent: any, children: any, id: number) {
    for (let i = 0; i < children.length; i ++) {
      const child = children[i]
      if (child.id === id) {
        switch (action) {
          case 'add-parent': {
            child.children.push({
              label: '新しいフォルダ',
              added: true,
              children: [],
            })
            child.children.sort(this.sortChildren)
            break
          }
          case 'add-child': {
            child.children.push({
              label: '新しいノード',
              added: true,
            })
            child.children.sort(this.sortChildren)
            break
          }
          case 'remove': {
            parent.children.splice(i, 1)
            break
          }
        }
        this.updateIdAll()
        return false
      }
      if (child.children != null && !this.traverse(action, child, child.children, id)) {
        return false
      }
    }
    return true
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

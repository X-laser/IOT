<template>
  <div class="rule-chain-flow-chart-container">
    <div class="flow" ref="flow"
      @dragover="$event => $event.preventDefault()"
      @dragenter="$event => $event.preventDefault()"
      @drop="drop">
    </div>
    <div class="contextmenu" ref="contextmenu"
      style="position: absolute; z-index: 2;">
      <div data-status="node-selected" class="menu" style="display: none;">
        <ul>
          <li v-if="showNodeEdit" @click="clickContextmenu('node-edit')">修改</li>
          <li v-if="showNodeDelete" @click="clickContextmenu('node-delete')">删除</li>
        </ul>
      </div>
      <div data-status="edge-selected" class="menu" style="display: none;">
        <ul>
          <li v-if="showEdgeEdit" @click="clickContextmenu('edge-edit')">修改</li>
          <li @click="clickContextmenu('edge-delete')">删除</li>
        </ul>
      </div>
    </div>
    <node-tpl ref="ruleChainsTpl" @submit="nodeSubmit"></node-tpl>
    <edge-tpl ref="edgeTpl" @submit="edgeSubmit" @cancel="edgeCancel"></edge-tpl>
    <wx-button type="primary" @click="save">保存</wx-button>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
import NodeTpl from '../node-tpl/index.vue'
import EdgeTpl from '../edge-tpl'
import { deepCopy } from '@/utils'
export default {
  props: ['dropRuleChainsNode', 'ruleChainsFlowChartData'],
  components: { NodeTpl, EdgeTpl },
  data () {
    return {
      flow: null,
      contextmenu: null,
      nodeId: '',
      nodeInfo: null,
      nodeType: '',
      nodeFormInfo: {},
      edgeInfo: {},
      showNodeEdit: true,
      showNodeDelete: true,
      showEdgeEdit: true
    }
  },
  methods: {
    async save () {
      const params = {
        ...this.ruleChainsFlowChartData,
        nodes: this.ruleChainsFlowChartData.nodes.map(ele => {
          const info = deepCopy(ele)
          if (ele.id.type === 'add') {
            delete info.id
          }
          return info
        }),
        ruleChainConnections: this.ruleChainsFlowChartData.ruleChainConnections.filter(item => Object.prototype.hasOwnProperty.call(item, 'fromIndex'))
      }
      const res = await this.$api.postRuleChainMetadata(params)
      if (res.status === 200) {
        this.$message.success('保存成功')
      }
    },
    edgeSubmit (form) {
      console.log(form)
      let fromIndex = ''
      let toIndex = ''
      const ruleChainConnections = this.ruleChainsFlowChartData.ruleChainConnections
      const ruleChainIdList = ruleChainConnections.map(item => item.additionalInfo.ruleChainNodeId)
      console.log(this.ruleChainsFlowChartData, 'ruleChainsFlowChartData')
      console.log(this.edgeInfo.target, 'target')
      if (ruleChainIdList.includes(this.edgeInfo.target)) {
        let fromIndex = null
        const ruleChainNodeInfo = ruleChainConnections.filter(item => item.additionalInfo.ruleChainNodeId === this.edgeInfo.target)[0]
        this.ruleChainsFlowChartData.nodes.forEach((item, index) => {
          if (item.id.id === this.edgeInfo.source) {
            fromIndex = index
          }
        })
        for (let i = 0; i < ruleChainConnections.length; i++) {
          if (ruleChainConnections[i].fromIndex === fromIndex && ruleChainConnections[i].additionalInfo.ruleChainNodeId === this.edgeInfo.target) {
            this.ruleChainsFlowChartData.ruleChainConnections.splice(i--, 1)
          }
        }
        form.link.forEach(item => {
          this.ruleChainsFlowChartData.ruleChainConnections.push({
            ...ruleChainNodeInfo,
            type: item,
            fromIndex
          })
        })
        console.log(fromIndex)
        console.log(ruleChainConnections, 'ruleChainConnections')
      } else {
        this.ruleChainsFlowChartData.nodes.forEach((item, index) => {
          if (item.id.id === this.edgeInfo.source) {
            fromIndex = index
          }
          if (item.id.id === this.edgeInfo.target) {
            toIndex = index
          }
        })
        const connections = this.ruleChainsFlowChartData.connections
        for (let i = 0; i < connections.length; i++) {
          if (connections[i].fromIndex === fromIndex && connections[i].toIndex === toIndex) {
            this.ruleChainsFlowChartData.connections.splice(i--, 1)
          }
        }
        form.link.forEach(item => {
          this.ruleChainsFlowChartData.connections.push({
            fromIndex,
            toIndex,
            type: item
          })
        })
      }
      this.flow.update(this.edgeInfo.id, {
        label: form.link.join('/'),
        style: {
          stroke: '#79838e'
        },
        labelRectStyle: {
          fill: '#fff',
          stroke: '#003a79',
          radius: 4,
          lineWidth: 2
        }
      })
    },
    edgeCancel () {
      this.flow.remove(this.edgeInfo.id)
    },
    nodeSubmit (form) {
      this.nodeFormInfo = form
      if (form.tplType === 'edit') {
        const selectedNodeInfo = this.flow.getSelected().filter(item => item.id === this.nodeId)[0]
        this.flow.update(this.nodeId, {
          label: `${selectedNodeInfo.model.label.split('\n')[0]}\n${form.name}`,
          x: selectedNodeInfo.model.x,
          y: selectedNodeInfo.model.y
        })
      } else {
        this.flow.add('node', {
          ...this.nodeInfo,
          label: `${this.nodeInfo.label}\n${form.name}`
        })
      }
    },
    drop (event) {
      const fill = this.dropRuleChainsNode.getAttribute('data-fill')
      const label = this.dropRuleChainsNode.getAttribute('data-label')
      const nodeId = this.dropRuleChainsNode.getAttribute('data-id')
      const nodeType = this.dropRuleChainsNode.getAttribute('data-type')
      this.nodeInfo = {
        x: event.offsetX,
        y: event.offsetY,
        style: { fill },
        size: '172*44',
        shape: 'flow-rect',
        label,
        nodeId,
        nodeType
      }
      this.$refs.ruleChainsTpl.openDialog({
        nodeTpl: nodeType
      })
    },
    clickContextmenu (type) {
      this.$refs.contextmenu.style.display = 'none'
      let nodeInfo = null
      let listName = 'nodes'
      switch (type) {
        case 'node-edit':
          console.log(this.nodeType)
          console.log(this.nodeId, 'nodeId')
          if (this.nodeType === 'RULECHAIN') {
            listName = 'ruleChainConnections'
          }
          nodeInfo = this.ruleChainsFlowChartData[listName].filter(item => {
            if (this.nodeType === 'RULECHAIN') {
              return item.additionalInfo.ruleChainNodeId === this.nodeId
            } else {
              return item.id.id === this.nodeId
            }
          })[0]
          this.$refs.ruleChainsTpl.openDialog({
            nodeTpl: this.nodeType === 'RULECHAIN' ? this.nodeType : nodeInfo.type,
            nodeInfo
          })
          break
        case 'edge-edit':
          this.$refs.edgeTpl.openDialog({
            link: this.edgeInfo.label.split('/')
          })
          break
        case 'node-delete':
          this.flow.remove(this.nodeId)
          break
        case 'edge-delete':
          this.flow.remove(this.edgeInfo.id)
          break
        default:
          break
      }
    },
    initEditor () {
      const editor = new G6Editor()
      // 基础流程图
      this.flow = new G6Editor.Flow({
        graph: {
          container: this.$refs.flow
        },
        grid: {
          type: 'line',
          cell: 20
        }
      })
      // 右键菜单
      this.contextmenu = new G6Editor.Contextmenu({
        container: this.$refs.contextmenu
      })
      // 监听右键被右击
      this.flow.on('node:contextmenu', evt => {
        console.log(evt)
        this.showNodeEdit = evt.item.model.label !== 'Input'
        this.showNodeDelete = evt.item.model.label !== 'Input'
        this.nodeType = evt.item.model.nodeType
        this.nodeId = evt.item.id
      })
      this.flow.on('edge:contextmenu', evt => {
        this.showEdgeEdit = evt.item.model.source !== 'input'
        this.edgeInfo = evt.item.model
      })
      this.flow.on('hoveranchor:beforeaddedge', evt => {
        if (evt.anchor.index !== 1) {
          evt.cancel = true
        }
      })

      this.flow.on('afterchange', evt => {
        const nodes = this.ruleChainsFlowChartData.nodes
        const edges = this.ruleChainsFlowChartData.connections
        const ruleChainConnections = this.ruleChainsFlowChartData.ruleChainConnections
        console.log(evt)
        // 不符合规范的操作
        if (evt.action !== 'changeData') {
          const model = evt.item.model
          const flag = [
            model.target instanceof Object,
            model.sourceAnchor === 1 && model.targetAnchor !== 3,
            model.sourceAnchor === 1 && model.targetAnchor === 3 && model.target === 'input'
          ].some(item => item === true)
          if (flag) {
            this.flow.remove(evt.item.id)
            return
          }
        }
        switch (evt.action) {
          case 'add':
            if (evt.item.type === 'node') {
              delete this.nodeFormInfo.tplType
              if (this.nodeFormInfo.nodeType === 'RULE_CHAIN') {
                ruleChainConnections.push({
                  additionalInfo: {
                    ...this.nodeFormInfo.additionalInfo,
                    layoutX: this.nodeInfo.x,
                    layoutY: this.nodeInfo.y,
                    ruleChainNodeId: evt.item.id
                  },
                  targetRuleChainId: {
                    ...this.nodeFormInfo.targetRuleChainId
                  }
                })
              } else {
                nodes.push({
                  ...this.nodeFormInfo,
                  type: this.nodeInfo.nodeType,
                  // configuration: {},
                  additionalInfo: {
                    ...this.nodeFormInfo.additionalInfo,
                    layoutX: this.nodeInfo.x,
                    layoutY: this.nodeInfo.y
                  },
                  id: {
                    id: evt.item.id,
                    type: 'add'
                  }
                })
              }
              console.log(this.nodeFormInfo)
            } else if (evt.item.type === 'edge') {
              if (evt.model.source !== 'input') {
                this.edgeInfo = evt.model
                this.$refs.edgeTpl.openDialog({})
              } else {
                this.ruleChainsFlowChartData.nodes.forEach((item, index) => {
                  if (item.id.id === evt.model.target) {
                    this.ruleChainsFlowChartData.firstNodeIndex = index
                  }
                })
              }
            }
            break
          case 'update':
            delete this.nodeFormInfo.tplType
            if (evt.item.type === 'node') {
              if (this.nodeFormInfo.nodeType === 'RULE_CHAIN') {
                this.ruleChainsFlowChartData.ruleChainConnections.forEach((item, index) => {
                  if (item.additionalInfo.ruleChainNodeId === evt.item.id) {
                    this.ruleChainsFlowChartData.ruleChainConnections[index] = {
                      ...item,
                      targetRuleChainId: {
                        ...item.targetRuleChainId,
                        ...this.nodeFormInfo.targetRuleChainId
                      },
                      additionalInfo: {
                        ...item.additionalInfo,
                        ...this.nodeFormInfo.additionalInfo,
                        layoutX: evt.updateModel.x,
                        layoutY: evt.updateModel.y
                      }
                    }
                  }
                })
              } else {
                this.ruleChainsFlowChartData.nodes.forEach((item, index) => {
                  const configuration = {
                    ...item.configuration,
                    ...this.nodeFormInfo.configuration
                  }
                  const additionalInfo = {
                    ...item.additionalInfo,
                    ...this.nodeFormInfo.additionalInfo,
                    layoutX: evt.updateModel.x,
                    layoutY: evt.updateModel.y
                  }
                  if (item.id.id === evt.item.id) {
                    this.ruleChainsFlowChartData.nodes[index] = {
                      ...item,
                      ...this.nodeFormInfo,
                      configuration,
                      additionalInfo
                    }
                  }
                })
              }
            }
            break
          case 'remove':
            if (evt.item.model.id === 'input' || evt.item.model.source === 'input') {
              this.ruleChainsFlowChartData.firstNodeIndex = null
            } else if (evt.item.type === 'node') {
              if (evt.item.model.nodeType === 'ruleChain') {
                for (let i = 0; i < ruleChainConnections.length; i++) {
                  if (evt.item.id === ruleChainConnections[i].targetRuleChainId.id) {
                    ruleChainConnections.splice(i--, 1)
                  }
                }
              } else {
                let removeIndex = ''
                nodes.forEach((item, index) => {
                  if (evt.item.id === item.id.id) {
                    nodes.splice(index, 1)
                    removeIndex = index
                  }
                })
                for (let i = 0; i < edges.length; i++) {
                  if (edges[i].fromIndex === removeIndex || edges[i].toIndex === removeIndex) {
                    edges.splice(i--, 1)
                  }
                }
              }
            } else if (evt.item.type === 'edge') {
              for (let i = 0; i < ruleChainConnections.length; i++) {
                if (nodes[ruleChainConnections[i].fromIndex].id.id === evt.item.model.source) {
                  ruleChainConnections.splice(i--, 1)
                }
              }
              for (let i = 0; i < this.ruleChainsFlowChartData.connections.length; i++) {
                const fromIndex = this.ruleChainsFlowChartData.connections[i].fromIndex
                const toIndex = this.ruleChainsFlowChartData.connections[i].toIndex
                const isForm = this.ruleChainsFlowChartData.nodes[fromIndex].id.id === evt.item.model.source
                const isTo = this.ruleChainsFlowChartData.nodes[toIndex].id.id === evt.item.model.target
                if (isForm && isTo) {
                  this.ruleChainsFlowChartData.connections.splice(i, 1)
                }
              }
            }
            break
          default:
            break
        }
        console.log(this.ruleChainsFlowChartData)
      })
      // 通过editor添加关联
      editor.add(this.flow)
      editor.add(this.contextmenu)
    },
    reRender (data) {
      this.flow.read(data)
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeDestroy () {
    this.flow.destroy()
  }
}
</script>

<style lang="scss" scoped>
  .rule-chain-flow-chart-container {
    float: left;
    width: calc(100% - 224px - 19px);
    height: 100%;
    margin-left: 19px;
    background-color: #fff;
    position: relative;
    .flow {
      height: 100%;
      /deep/ .graph-container {
        height: 100%;
      }
    }
    .contextmenu {
      margin: 0px;
      width: 100px;
      background: white;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      color: #000;
      font-size: 12px;
      display: none;
      ul {
        box-sizing: content-box;
        li {
          line-height: 20px;
          text-align: center;
          border-bottom: 1px solid #eee;
          &:hover {
            cursor: pointer;
            background: #e6f7ff;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    > .wx-button {
      position: absolute;
      top: 0;
      right: 0
    }
  }
</style>

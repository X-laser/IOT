<template>
  <div class="app-container">
    <node-tree :ruleChainsTypes="ruleChainsTypes" @dragstart="dragstart"></node-tree>
    <flow-chart ref="ruleChainFlowChart" :dropRuleChainsNode="dropRuleChainsNode" :ruleChainsFlowChartData="ruleChainsFlowChartData"></flow-chart>
  </div>
</template>

<script>
import NodeTree from './node-tree'
import FlowChart from './flow-chart'
export default {
  props: ['id'],
  components: { NodeTree, FlowChart },
  data () {
    return {
      ruleChainsTypes: {
        FILTER: { title: '滤波器', color: '#f1e861', list: [] },
        ENRICHMENT: { title: '属性集', color: '#cdf14e', list: [] },
        TRANSFORMATION: { title: '变换', color: '#79cef1', list: [] },
        ACTION: { title: '动作', color: '#f1928f', list: [] },
        EXTERNAL: { title: '外部的', color: '#fbc766', list: [] },
        RULECHAIN: { title: '规则链', color: '#d6c4f1', list: [] }
      },
      ruleChainsNodeData: [],
      ruleChainsFlowChartData: [],
      dropRuleChainsNode: ''
    }
  },
  methods: {
    dragstart (event) {
      this.dropRuleChainsNode = event.toElement
    },
    async getRuleChainsNodeData () {
      const res = await this.$api.getComponents('FILTER,ENRICHMENT,TRANSFORMATION,ACTION,EXTERNAL')
      this.ruleChainsNodeData = res.data
      res.data.forEach(item => {
        this.ruleChainsTypes[item.type].list.push(item)
      })
      this.ruleChainsTypes.RULECHAIN.list = [{
        type: 'RULECHAIN',
        id: 'RULECHAIN',
        name: 'rule chain'
      }]
      for (const key in this.ruleChainsTypes) {
        this.ruleChainsTypes[key].list = this.ruleChainsTypes[key].list.sort((a, b) => a.name.localeCompare(b.name))
      }
      this.initEditorData()
    },
    async initEditorData () {
      const res = await this.$api.getRuleChainMetadata(this.id)
      const { nodes, connections, ruleChainConnections } = res.data
      this.ruleChainsFlowChartData = {
        ...res.data,
        nodes: nodes || [],
        connections: connections || [],
        ruleChainConnections: ruleChainConnections || []
      }
      const _nodes = [
        ...res.data.nodes.map(ele => Object.assign({
          id: ele.id.id,
          x: ele.additionalInfo.layoutX,
          y: ele.additionalInfo.layoutY,
          style: {
            fill: this.ruleChainsTypes[this.ruleChainsNodeData.filter(item => item.clazz === ele.type)[0].type].color
          },
          size: '172*44',
          shape: 'flow-rect',
          label: `${this.ruleChainsNodeData.filter(item => item.clazz === ele.type)[0].name}\n${ele.name}`
        })),
        {
          id: 'input',
          x: 50,
          y: 150,
          style: {
            fill: '#a3eaa9'
          },
          size: '172*44',
          shape: 'flow-rect',
          label: 'Input'
        }
      ]
      const edgesIndex = {}
      res.data.connections && res.data.connections.forEach((ele, index) => {
        const isHasOwnProperty = Object.prototype.hasOwnProperty.call(edgesIndex, `${ele.fromIndex}-${ele.toIndex}`)
        edgesIndex[`${ele.fromIndex}-${ele.toIndex}`] = isHasOwnProperty ? `${edgesIndex[`${ele.fromIndex}-${ele.toIndex}`]} / ${ele.type}` : ele.type
      })
      const edges = []
      for (const key in edgesIndex) {
        edges.push({
          source: res.data.nodes[key.split('-')[0]].id.id,
          target: res.data.nodes[key.split('-')[1]].id.id,
          controlPoints: [{
            x: 100,
            y: 100
          }],
          label: edgesIndex[key],
          sourceAnchor: 1,
          targetAnchor: 3,
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
      }
      const rulechain = {}
      res.data.ruleChainConnections && res.data.ruleChainConnections.forEach(item => {
        const key = `${item.fromIndex}-${item.targetRuleChainId.id}`
        const isHasOwnProperty = Object.prototype.hasOwnProperty.call(rulechain, key)
        rulechain[key] = isHasOwnProperty ? { ...item, type: `${rulechain[key].type} / ${item.type}` } : item
      })
      for (const key in rulechain) {
        const value = rulechain[key]
        const info = await this.$api.getRuleChainsInfo(value.targetRuleChainId.id)
        edges.push({
          source: res.data.nodes[value.fromIndex].id.id,
          target: value.targetRuleChainId.id,
          controlPoints: [{
            x: 10,
            y: 10
          }],
          label: value.type,
          sourceAnchor: 1,
          targetAnchor: 3,
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
        nodes.push({
          id: value.targetRuleChainId.id,
          x: value.additionalInfo.layoutX,
          y: value.additionalInfo.layoutY,
          style: {
            fill: this.ruleChainsTypes.RULECHAIN.color
          },
          size: '172*44',
          shape: 'flow-rect',
          label: `rule chain\n${info.data.name}`,
          nodeType: 'ruleChain'
        })
      }
      if (res.data.firstNodeIndex !== null) {
        edges.push({
          source: 'input',
          target: nodes[res.data.firstNodeIndex].id.id,
          controlPoints: [{
            x: 10,
            y: 10
          }],
          sourceAnchor: 1,
          targetAnchor: 3,
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
      }
      this.reRender({
        nodes: _nodes,
        edges
      })
    },
    reRender (data) {
      this.$refs.ruleChainFlowChart.reRender(data)
    }
  },
  created () {
    this.getRuleChainsNodeData()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background-color: transparent;
  margin: 0;
  position: relative;
}
</style>

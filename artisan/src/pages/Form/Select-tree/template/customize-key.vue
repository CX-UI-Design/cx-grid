<!--UI 组件库 - Select-tree basic- 页面测试-->
<template>
  <demo-block>
    <template slot="title">基础用法</template>
    <template slot="describe">单选框禁用不可选</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="selectTreeOptions"
        :multiple="true"
        :model-consists="modelConsists"
        :sort-model-by="sortModelBy"
        :flat="flat"
        :default-expand-level="defaultExpandLevel"
        :disable-branch-nodes="disableBranchNodes"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>Value consists of:</span>
          <ns-radio v-model="modelConsists" :options="modelConsistsOpts"></ns-radio>
          <span>value/model 排序:</span>
          <ns-radio v-model="sortModelBy" :options="sortModelByOpts"></ns-radio>
          <span> 平面模式:</span>
          <ns-switch v-model="flat"></ns-switch>
          <span>节点是否可被选择:</span>
          <ns-switch v-model="disableBranchNodes"></ns-switch>
        </div>
        <div class="control-block form-block-line">
          <span>节点初始展开的层级:</span>
          <ns-input v-model.number="defaultExpandLevel_Ipt" placeholder="请输入展开的层级"></ns-input>
        </div>
      </div>
    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'select-tree-demo-basic',
    data() {
      return {
        selectTreeModel: ['team-1'],
        placeholder: '请选择...',
        multiple: true,
        disabled: false,
        clearable: true,
        limit_Ipt: 2,
        limitText: count => `+ ${count} more`,
        appendToBody: true,
        modelConsists: 'LEAF_PRIORITY',//"ALL", "BRANCH_PRIORITY", "LEAF_PRIORITY" or "ALL_WITH_INDETERMINATE"
        modelConsistsOpts: [
          { label: 'ALL', value: 'ALL' },
          { label: 'Branch priority', value: 'BRANCH_PRIORITY' },
          { label: 'Leaf priority', value: 'LEAF_PRIORITY' },
          { label: 'All with indeterminate', value: 'ALL_WITH_INDETERMINATE' },
        ],
        sortModelBy: 'ORDER_SELECTED',
        sortModelByOpts: [
          { label: 'Order selected', value: 'ORDER_SELECTED' },
          { label: 'Level', value: 'LEVEL' },
          { label: 'Index', value: 'INDEX' },
        ],
        flat: false,
        disableBranchNodes: false,
        defaultExpandLevel_Ipt: 0,
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
      defaultExpandLevel() {
        return this.defaultExpandLevel_Ipt || 0;
      },
    },
    methods: {},
    created() {

    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

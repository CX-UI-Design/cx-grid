<!--UI 组件库 - 业务 Table-->
<template>
  <div>
    <ns-table-v3 ref="oldBizTable"
                 :data="data.list" :head="finalHead" :keyRefer="keyRefer" :height="height"
                 :loadState="loadState"
                 :is-form-table="isFormTable"
                 :cellFifter="cellFifter"
                 :showHeadOperation="showHeadOperation"
                 :showSummary="showSummary"
                 :summary-method="summaryMethod"
                 :initSummaryState="initSummaryState"
                 :rulesConfig="rulesConfig"
                 @selection-select="selectionSelect"
                 @selection-select-all="selectionSelectAll"
                 @selection-change="selectionChange"
                 @table-action="tableAction"
                 @cell-action="cellAction"
                 @cell-form-change="cellFormChange"
                 @add-row="addRow"
                 @delete-current-row="deleteCurrentRow"
                 @summary-command="summaryCommand"
                 @refresh="refresh"
    ></ns-table-v3>
    <ns-pagination
      class="biz-pagination"
      :total="data.total || 0" :searchConditions="searchConditions"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></ns-pagination>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import resizeHeight from './resize-height';
  import columnConfig from './column-template-config';
  import cellFifter from './cell-fifter';
  import rulesConfig from '../../../utils/validate/rules-config';
  import keyRefer from './keyRefer';

  export default {
    name: 'old-biz-table',
    mixins: [resizeHeight],
    data() {
      return {
        keyRefer,
        cellFifter,
        rulesConfig,
      };
    },
    props: {
      data: { type: Object },
      localHead: { type: Array, request: false }, //本地表头数据
      //表格数据加载状态
      loadState: {
        type: Object, default() {
          return {
            data: false,
            head: false,
          };
        },
      },
      searchConditions: { type: Object },//筛选条件
      isFormTable: { type: Boolean, default: false },//是否是表单表格
      //第一列固定列类型（非自动表头配置）
      firstColType: { type: [String, Boolean, null], default: 'selection', validator: t => ['index', 'selection', 'radio', null].indexOf(t) > -1 },
      hasActionCol: { type: Boolean, default: true },//是否有操作列
      showHeadOperation: { type: Boolean, default: true },//表头设置操作模块开关
      showAddRowOperation: { type: Boolean, default: false },//表头设置 新增行操作模块开关
      showSummary: { type: Boolean, default: false },//是否显示合计行
      summaryMethod: { type: Function },//自定义的合计计算方法
      initSummaryState: { type: String, default: 'current' },//初始合计模块控制指令状态 - 'current' / 'total'
    },
    computed: {
      ...mapGetters(['tableHead']),
      isRender() {
        return this.loadState.data && this.loadState.head;
      },
      finalHead() {
        return [
          ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
          ...(this.localHead ? this.localHead : this.tableHead),
          ...(this.hasActionCol ? [columnConfig['action']] : []),
          ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),

        ].map(item => {
          item.resourcecolumnHidden = item.resourcecolumnHidden === '1' ? true : false;
          return item;
        });
      },
    },
    methods: {
      /**
       * get table head data
       */
      getTableHead() {
        if (this.localHead) {
          this.loadState.head = true;
        }
        else {
          this.$store.dispatch('generateTableHead', { funcId: 'funcId', mockType: this.searchConditions.mockType }).then(() => {
            this.loadState.head = true;
          }).catch(() => {
            this.loadState.head = true;
          });
        }
      },
      /**
       * 分页器当前显示条数改变
       * @param val
       */
      sizeChange(val) {
        console.log('size-change', val);
        this.$emit('reload');
      },
      /**
       * 分页器当前页切换
       * @param val
       */
      currentChange(val) {
        console.log('current-page-change', val);
        this.$emit('reload');
      },

      /**
       * 当选择项发生变化时会触发该事件
       * @param row
       * @param index
       */
      selectionChange(row, index) {
        this.$emit('selection-change', row, index);
      },

      /**
       * 当用户手动勾选数据行的 Checkbox 时触发的事件
       * @param selection
       * @param row
       */
      selectionSelect(selection, row) {
        this.$emit('selection-select', selection, row);
      },

      /**
       * 当用户手动勾选全选 Checkbox 时触发的事件
       * @param selection
       */
      selectionSelectAll(selection) {
        this.$emit('selection-select-all', selection);
      },


      tableAction(info, scope) {
        this.$emit('table-action', info, scope);
      },
      cellAction(scope, item) {
        console.log('表格单元格点击行为事件');
        console.log(scope, item);
      },
      cellFormChange(value, param) {
        this.$emit('cell-form-change', value, param);
      },
      /**
       * add row to grid
       */
      addRow() {
        this.$emit('add-row');
      },
      /**
       * delete current row
       * @param index
       * @param row
       */
      deleteCurrentRow(index, row) {
        this.$emit('delete-current-row', index, row);
      },
      /**
       * 选择全部事件
       */
      checkAll() {
        this.$refs['oldBizTable'].checkAll();
      },
      resetCheck() {
        this.$refs['oldBizTable'].resetCheck();
      },
      /**
       * 合计按钮切换
       * @param command
       */
      summaryCommand(command) {
        this.$emit('summary-command', command);
      },

      refresh() {
        this.$emit('reload');
      },

      /**
       * reset select state
       * @param type  - selection / radio
       * @param rowindex   - 操作行索引
       * @param selected  -  选中状态 true / false
       */
      setSelectedRow(type, rowindex, selected) {
        this.$refs['oldBizTable'].setSelectedRow(type, rowindex, selected);
      },

      /**
       * reset select state
       * @param type  - selection / radio
       */
      resetSelectState(type) {
        this.$refs['oldBizTable'].resetSelectState(type);
      },
      getResponseColumn() {
        return this.tableHead || [];
      },
      getAllColumn() {
        return this.finalHead || [];
      },
    },
    created() {
      this.getTableHead();

    },
    beforeDestroy() {
      this.keyRefer = null;
      this.rulesConfig = null;
      this.cellFifter = null;
      this.data.list = null;
      // :data="data.list" :head="finalHead" :keyRefer="keyRefer" :height="height"
      // :loadState="loadState"
      // :is-form-table="isFormTable"
      // :cellFifter="cellFifter"
      // :showHeadOperation="showHeadOperation"
      // :showSummary="showSummary"
      // :rulesConfig="rulesConfig"


    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .ns-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px;
    z-index: 99;
    background-color: #ebedef;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
</style>

<template>
  <div class="order">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单管理</span>
          <el-button type="primary" @click="handleAdd">新增订单</el-button>
        </div>
      </template>

      <el-table :data="orderList" style="width: 100%">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="bookName" label="图书名称" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="amount" label="金额" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px">
      <el-form :model="orderForm" label-width="100px">
        <el-form-item label="图书名称">
          <el-input v-model="orderForm.bookName" />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="orderForm.customer" />
        </el-form-item>
        <el-form-item label="金额">
          <el-input-number v-model="orderForm.amount" :precision="2" :step="0.1" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="orderForm.status">
            <el-option label="待付款" value="待付款" />
            <el-option label="已付款" value="已付款" />
            <el-option label="已发货" value="已发货" />
            <el-option label="已完成" value="已完成" />
            <el-option label="已取消" value="已取消" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
const dialogTitle = ref('新增订单')

const orderForm = reactive({
  bookName: '',
  customer: '',
  amount: 0,
  status: '待付款'
})

const orderList = ref([
  {
    id: 'DD20240101001',
    bookName: '三体',
    customer: '张三',
    amount: 68.00,
    status: '已付款',
    createTime: '2024-01-01 12:00:00'
  },
  {
    id: 'DD20240101002',
    bookName: '活着',
    customer: '李四',
    amount: 45.00,
    status: '待付款',
    createTime: '2024-01-01 13:00:00'
  }
])

const getStatusType = (status) => {
  const statusMap = {
    '待付款': 'warning',
    '已付款': 'success',
    '已发货': 'primary',
    '已完成': 'success',
    '已取消': 'info'
  }
  return statusMap[status] || 'info'
}

const handleAdd = () => {
  dialogTitle.value = '新增订单'
  Object.assign(orderForm, {
    bookName: '',
    customer: '',
    amount: 0,
    status: '待付款'
  })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑订单'
  Object.assign(orderForm, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除订单 ${row.id} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 这里添加删除逻辑
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {})
}

const handleSave = () => {
  // 这里添加保存逻辑
  dialogVisible.value = false
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-tag {
  margin-right: 8px;
}
</style> 
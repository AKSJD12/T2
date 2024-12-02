<template>
  <div class="storage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>库存管理</span>
          <el-button type="primary" @click="handleAdd">添加库存</el-button>
        </div>
      </template>
      
      <el-table :data="storageList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="bookName" label="图书名称" />
        <el-table-column prop="quantity" label="库存数量" />
        <el-table-column prop="location" label="库位" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px">
      <el-form :model="storageForm" label-width="100px">
        <el-form-item label="图书名称">
          <el-input v-model="storageForm.bookName" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="storageForm.quantity" :min="0" />
        </el-form-item>
        <el-form-item label="库位">
          <el-input v-model="storageForm.location" />
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
const dialogTitle = ref('添加库存')
const storageForm = reactive({
  bookName: '',
  quantity: 0,
  location: ''
})

const storageList = ref([
  {
    id: 1,
    bookName: '三体',
    quantity: 100,
    location: 'A-01-01',
    updateTime: '2024-01-01'
  },
  // 更多测试数据...
])

const handleAdd = () => {
  dialogTitle.value = '添加库存'
  Object.assign(storageForm, {
    bookName: '',
    quantity: 0,
    location: ''
  })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑库存'
  Object.assign(storageForm, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  // 添加删除确认逻辑
}

const handleSave = () => {
  // 添加保存逻辑
  dialogVisible.value = false
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 
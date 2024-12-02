<template>
  <div class="books">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>图书管理</span>
          <el-button type="primary" @click="handleAdd">添加图书</el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="图书名称">
          <el-input v-model="searchForm.name" placeholder="请输入图书名称" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchForm.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类">
            <el-option label="小说" value="小说" />
            <el-option label="文学" value="文学" />
            <el-option label="计算机" value="计算机" />
            <el-option label="历史" value="历史" />
            <el-option label="经济" value="经济" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 图书列表 -->
      <el-table :data="bookList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="author" label="作者" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="price" label="价格" width="100">
          <template #default="scope">
            ¥ {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '在售' ? 'success' : 'info'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(scope.row)">
              删除
            </el-button>
            <el-button 
              size="small" 
              :type="scope.row.status === '在售' ? 'warning' : 'success'"
              @click="handleToggleStatus(scope.row)">
              {{ scope.row.status === '在售' ? '下架' : '上架' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px">
      <el-form :model="bookForm" :rules="rules" ref="bookFormRef" label-width="100px">
        <el-form-item label="图书名称" prop="name">
          <el-input v-model="bookForm.name" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="bookForm.author" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="bookForm.category" placeholder="请选择分类" style="width: 100%">
            <el-option label="小说" value="小说" />
            <el-option label="文学" value="文学" />
            <el-option label="计算机" value="计算机" />
            <el-option label="历史" value="历史" />
            <el-option label="经济" value="经济" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="bookForm.price" :precision="2" :step="0.1" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input-number v-model="bookForm.stock" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="bookForm.description" :rows="3" />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="cover-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <img v-if="bookForm.cover" :src="bookForm.cover" class="cover" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 搜索表单
const searchForm = reactive({
  name: '',
  author: '',
  category: ''
})

// 图书列表数据
const bookList = ref([
  {
    id: 1,
    name: '三体',
    author: '刘慈欣',
    category: '小说',
    price: 68.00,
    stock: 100,
    status: '在售',
    description: '科幻小说代表作',
    cover: 'https://example.com/cover1.jpg'
  },
  {
    id: 2,
    name: '活着',
    author: '余华',
    category: '文学',
    price: 45.00,
    stock: 50,
    status: '在售',
    description: '当代文学经典',
    cover: 'https://example.com/cover2.jpg'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('添加图书')
const bookFormRef = ref(null)

const bookForm = reactive({
  name: '',
  author: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  cover: ''
})

const rules = {
  name: [
    { required: true, message: '请输入图书名称', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存', trigger: 'blur' }
  ]
}

// 搜索方法
const handleSearch = () => {
  // 这里添加搜索逻辑
  console.log('搜索条件：', searchForm)
}

const resetSearch = () => {
  Object.assign(searchForm, {
    name: '',
    author: '',
    category: ''
  })
}

// 分页方法
const handleSizeChange = (val) => {
  pageSize.value = val
  // 重新加载数据
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  // 重新加载数据
}

// 添加图书
const handleAdd = () => {
  dialogTitle.value = '添加图书'
  Object.assign(bookForm, {
    name: '',
    author: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    cover: ''
  })
  dialogVisible.value = true
}

// 编辑图书
const handleEdit = (row) => {
  dialogTitle.value = '编辑图书'
  Object.assign(bookForm, row)
  dialogVisible.value = true
}

// 删除图书
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除图书《${row.name}》吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 这里添加删除逻辑
    ElMessage.success('删除成功')
  }).catch(() => {})
}

// 上下架图书
const handleToggleStatus = (row) => {
  const action = row.status === '在售' ? '下架' : '上架'
  ElMessageBox.confirm(
    `确定要${action}图书《${row.name}》吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    row.status = row.status === '在售' ? '已下架' : '在售'
    ElMessage.success(`${action}成功`)
  }).catch(() => {})
}

// 保存图书
const handleSave = () => {
  bookFormRef.value.validate((valid) => {
    if (valid) {
      // 这里添加保存逻辑
      dialogVisible.value = false
      ElMessage.success('保存成功')
    }
  })
}

// 上传图片
const beforeUpload = (file) => {
  // 这里添加图片上传逻辑
  return false
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}

.cover-uploader:hover {
  border-color: #409EFF;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style> 
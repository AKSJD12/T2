<template>
  <div class="dashboard">
    <!-- 数据概览卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>总销售额</span>
              <el-tag type="success">日</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">¥ {{ salesData.total }}</div>
            <div class="compare">
              <span>较昨日</span>
              <span :class="salesData.growth >= 0 ? 'up' : 'down'">
                {{ Math.abs(salesData.growth) }}%
                <el-icon><component :is="salesData.growth >= 0 ? 'CaretTop' : 'CaretBottom'" /></el-icon>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>订单数</span>
              <el-tag type="warning">日</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">{{ orderData.count }}</div>
            <div class="compare">
              <span>较昨日</span>
              <span :class="orderData.growth >= 0 ? 'up' : 'down'">
                {{ Math.abs(orderData.growth) }}%
                <el-icon><component :is="orderData.growth >= 0 ? 'CaretTop' : 'CaretBottom'" /></el-icon>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>新增用户</span>
              <el-tag type="info">月</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">{{ userData.new }}</div>
            <div class="compare">
              <span>较上月</span>
              <span :class="userData.growth >= 0 ? 'up' : 'down'">
                {{ Math.abs(userData.growth) }}%
                <el-icon><component :is="userData.growth >= 0 ? 'CaretTop' : 'CaretBottom'" /></el-icon>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>库存预警</span>
              <el-tag type="danger">实时</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">{{ stockData.warning }}</div>
            <div class="desc">低于预警值商品数量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表展示 -->
    <el-row :gutter="20" class="charts-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
              <el-radio-group v-model="salesChartType" size="small">
                <el-radio-button label="week">周</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container" ref="salesChartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>热销图书</span>
            </div>
          </template>
          <div class="chart-container" ref="booksChartRef"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最新订单 -->
    <el-card shadow="hover" class="latest-orders">
      <template #header>
        <div class="card-header">
          <span>最新订单</span>
          <el-button type="primary" link>查看更多</el-button>
        </div>
      </template>
      <el-table :data="latestOrders" style="width: 100%">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="books" label="图书" />
        <el-table-column prop="amount" label="金额" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getOrderStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

// 数据统计
const salesData = reactive({
  total: '8,846.00',
  growth: 12.5
})

const orderData = reactive({
  count: 168,
  growth: -5.2
})

const userData = reactive({
  new: 256,
  growth: 8.5
})

const stockData = reactive({
  warning: 12
})

// 销售趋势图表
const salesChartRef = ref(null)
const salesChartType = ref('week')
let salesChart = null

// 热销图书图表
const booksChartRef = ref(null)
let booksChart = null

// 最新订单
const latestOrders = ref([
  {
    id: 'DD20240101001',
    customer: '张三',
    books: '三体、活着',
    amount: '113.00',
    status: '已付款',
    createTime: '2024-01-01 12:00:00'
  },
  {
    id: 'DD20240101002',
    customer: '李四',
    books: '百年孤独',
    amount: '58.00',
    status: '待付款',
    createTime: '2024-01-01 13:00:00'
  },
  {
    id: 'DD20240101003',
    customer: '王五',
    books: '红楼梦、西游记',
    amount: '156.00',
    status: '已发货',
    createTime: '2024-01-01 14:00:00'
  }
])

const getOrderStatusType = (status) => {
  const statusMap = {
    '待付款': 'warning',
    '已付款': 'success',
    '已发货': 'primary',
    '已完成': 'success',
    '已取消': 'info'
  }
  return statusMap[status] || 'info'
}

// 初始化图表
onMounted(() => {
  // 销售趋势图表
  salesChart = echarts.init(salesChartRef.value)
  salesChart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  })

  // 热销图书图表
  booksChart = echarts.init(booksChartRef.value)
  booksChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '三体' },
          { value: 735, name: '活着' },
          { value: 580, name: '百年孤独' },
          { value: 484, name: '红楼梦' },
          { value: 300, name: '西游记' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    salesChart.resize()
    booksChart.resize()
  })
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.data-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-content {
    text-align: center;
    
    .number {
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
    }

    .compare {
      color: #909399;
      font-size: 14px;

      .up {
        color: #67C23A;
      }

      .down {
        color: #F56C6C;
      }
    }

    .desc {
      color: #909399;
      font-size: 14px;
    }
  }
}

.charts-row {
  margin-top: 20px;

  .chart-container {
    height: 300px;
  }
}

.latest-orders {
  margin-top: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.el-card {
  margin-bottom: 20px;
}
</style> 
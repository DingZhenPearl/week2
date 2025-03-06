<template>
  <div class="equipment-management">
    <!-- 状态筛选区 -->
    <el-row :gutter="20" class="filter-area">
      <el-col :span="8">
        <el-input v-model="searchKey" placeholder="设备ID/名称"></el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filterStatus" clearable placeholder="全部状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="goToAddEquipment">新增设备</el-button>
      </el-col>
    </el-row>

    <!-- 设备状态统计 -->
    <el-row :gutter="20" class="status-board">
      <el-col :span="6" v-for="(status, index) in statusSummary" :key="index">
        <el-card shadow="hover">
          <div class="status-card" :style="{color: status.color}">
            <h3>{{ status.label }}</h3>
            <p class="count">{{ status.count }}</p>
            <p>{{ status.ratio }}%</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 设备信息表格 -->
    <el-table 
      :data="filteredEquipments"
      stripe
      style="width: 100%"
      class="equipment-table">
      <el-table-column prop="id" label="设备ID" width="120"></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="{row}">
          <el-tag 
            :type="statusType[row.status]" 
            effect="dark"
            class="status-tag">
            {{ statusMap[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastMaintain" label="最后维护时间"></el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="{row}">
          <el-button 
            size="mini" 
            :type="row.status === 1 ? 'warning' : 'success'"
            @click="handlePowerControl(row)">
            {{ row.status === 1 ? '停机' : '开机' }}
          </el-button>
          <el-button size="mini" @click="goToEditEquipment(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑设备对话框 -->
    <el-dialog
      :title="dialogType === 'add' ? '新增设备' : '编辑设备'"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form :model="equipmentForm" ref="equipmentForm" :rules="rules" label-width="100px">
        <el-form-item label="设备ID" prop="id">
          <el-input v-model="equipmentForm.id" :disabled="dialogType === 'edit'"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="equipmentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-select v-model="equipmentForm.status">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import equipmentService from './services/equipmentService'

export default {
  data() {
    return {
      equipments: [],
      searchKey: '',
      filterStatus: null,
      statusMap: {
        1: '运行中',
        2: '待机',
        3: '故障'
      },
      statusType: {
        1: 'success',
        2: 'info',
        3: 'danger'
      },
      statusOptions: [
        {value: 1, label: '运行中'},
        {value: 2, label: '待机'},
        {value: 3, label: '故障'}
      ],
      dialogVisible: false,
      dialogType: 'add', // 'add' 或 'edit'
      equipmentForm: {
        id: '',
        name: '',
        status: 1,
        lastMaintain: new Date().toLocaleString()
      },
      rules: {
        id: [
          { required: true, message: '请输入设备ID', trigger: 'blur' },
          { min: 3, max: 20, message: 'ID长度在3到20个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 2, max: 50, message: '名称长度在2到50个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ]
      }
    }
  },

  computed: {
    filteredEquipments() {
      return this.equipments.filter(item => {
        const matchSearch = item.id.includes(this.searchKey) || 
          item.name.includes(this.searchKey)
        const matchStatus = this.filterStatus ? 
          item.status === this.filterStatus : true
        return matchSearch && matchStatus
      })
    },

    statusSummary() {
      const total = this.equipments.length
      return this.statusOptions.map(opt => {
        const count = this.equipments.filter(e => e.status === opt.value).length
        return {
          ...opt,
          count,
          ratio: total ? ((count / total) * 100).toFixed(1) : 0,
          color: this.statusType[opt.value]
        }
      })
    }
  },

  methods: {
    goToAddEquipment() {
      this.dialogType = 'add'
      this.equipmentForm = {
        id: '',
        name: '',
        status: 1,
        lastMaintain: new Date().toLocaleString()
      }
      this.dialogVisible = true
    },

    goToEditEquipment(row) {
      this.dialogType = 'edit'
      this.equipmentForm = {...row}
      this.dialogVisible = true
    },

    handleSubmit() {
      this.$refs.equipmentForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'add') {
            equipmentService.addEquipment(this.equipmentForm)
          } else {
            equipmentService.updateEquipment(this.equipmentForm)
          }
          this.loadEquipments()
          this.dialogVisible = false
          this.$message.success(this.dialogType === 'add' ? '添加成功' : '更新成功')
        }
      })
    },

    handleDelete(row) {
      this.$confirm('确认删除该设备？删除后数据无法恢复', '提示', {
        type: 'warning'
      }).then(() => {
        equipmentService.deleteEquipment(row.id)
        this.loadEquipments()
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    handlePowerControl(row) {
      const action = row.status === 1 ? '停机' : '开机';
      this.$confirm(`确认要对设备 ${row.name} 执行${action}操作吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        const newStatus = row.status === 1 ? 2 : 1;  // 1:运行中, 2:待机
        const updatedEquipment = {
          ...row,
          status: newStatus,
          lastMaintain: new Date().toLocaleString()
        };
        const result = equipmentService.updateEquipment(updatedEquipment);
        console.log(result);
        console.log(row);
        if (result) {
          this.loadEquipments();
          this.$message.success(`${action}操作成功`);
        } else {
          this.$message.error(`${action}操作失败`);
        }
      }).catch(() => {
        this.$message.info('已取消操作');
      });
    },

    loadEquipments() {
      this.equipments = equipmentService.getAllEquipments()
    }
  },

  // 生命周期钩子
  created() {
    this.loadEquipments()
  }
}
</script>

<style scoped>
.equipment-management {
  padding: 20px;
}
.equipment-management .filter-area {
  margin-bottom: 20px;
}
.equipment-management .status-board {
  margin-bottom: 20px;
}
.equipment-management .status-board .status-card {
  text-align: center;
}
.equipment-management .status-board .status-card .count {
  font-size: 24px;
  margin: 10px 0;
}
.equipment-management .status-tag {
  font-weight: bold;
  padding: 0 10px;
  border-radius: 12px;
}
</style>
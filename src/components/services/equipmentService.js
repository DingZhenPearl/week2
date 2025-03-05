// 服务模拟后端数据
export default {
    get equipments() {
      // 从 localStorage 获取数据，如果没有则使用默认值
      const stored = localStorage.getItem('equipments')
      return stored ? JSON.parse(stored) : [
        {id: 'M001', name: '数控机床', status: 1, lastMaintain: '2024-02-15 14:00'},
        {id: 'M002', name: '激光切割机', status: 2, lastMaintain: '2024-02-14 09:30'}
      ]
    },
    
    // 保存数据到localStorage的辅助方法
    saveData(data) {
      localStorage.setItem('equipments', JSON.stringify(data))
    },
  
    getAllEquipments() {
      return this.equipments
    },
  
    getEquipmentById(id) {
      return this.equipments.find(e => e.id === id)
    },
  
    addEquipment(equipment) {
      const equipments = this.equipments
      const newEquipment = {
        ...equipment,
        id: 'M' + Date.now().toString().substr(-4),
        createTime: new Date().toLocaleString()
      }
      equipments.unshift(newEquipment)
      this.saveData(equipments)
      return newEquipment
    },
  
    updateEquipment(equipment) {
      const equipments = this.equipments
      const index = equipments.findIndex(e => e.id === equipment.id)
      if (index !== -1) {
        equipments[index] = { ...equipment }
        this.saveData(equipments)
        return true
      }
      return false
    },
  
    deleteEquipment(id) {
      const equipments = this.equipments
      const index = equipments.findIndex(e => e.id === id)
      if (index !== -1) {
        equipments.splice(index, 1)
        this.saveData(equipments)
        return true
      }
      return false
    }
  }
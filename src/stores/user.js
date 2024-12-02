import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 模拟用户数据
  const users = ref([
    {
      username: 'admin',
      password: '123456',
      email: 'admin@example.com',
      role: 'admin'
    }
  ])

  const currentUser = ref(null)

  // 登录方法
  const login = (username, password) => {
    const user = users.value.find(
      u => u.username === username && u.password === password
    )
    if (user) {
      currentUser.value = user
      return true
    }
    return false
  }

  // 注册方法
  const register = (userData) => {
    const existingUser = users.value.find(u => u.username === userData.username)
    if (existingUser) {
      return false
    }
    users.value.push(userData)
    return true
  }

  // 退出登录
  const logout = () => {
    currentUser.value = null
  }

  return {
    currentUser,
    login,
    register,
    logout
  }
}) 
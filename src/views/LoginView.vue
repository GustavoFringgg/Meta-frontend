<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAlert } from '@/Composables/useAlert'

const { showAlert } = useAlert()
const img = ref(
  'https://firebasestorage.googleapis.com/v0/b/metawall-a2771.appspot.com/o/local%2Fimg.svg?alt=media&token=0cd7e380-7158-4632-9b3c-3f5766bc954c',
)

const click = () => {
  return showAlert('登入成功', 'success')
}
</script>

<template>
  <main>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="row shadow rounded p-5 bg-light border border-3 border-dark w-75 h-75">
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <!-- 左側圖像 -->
          <img :src="img" alt="MetaWall Illustration" class="img-fluid" />
        </div>
        <div class="col-md-6 d-flex flex-column">
          <!-- 登入表單 -->
          <div class="text-center">
            <h1 class="text-primary fw-bold">MetaWall</h1>
            <p class="text-secondary">元宇宙展開全新社交圈</p>
          </div>
          <form @submit.prevent="handleLogin">
            <div class="mb-3 mt-auto">
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="email"
                required
                placeholder="請輸入email"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="password"
                required
                placeholder="請輸入密碼"
              />
            </div>
          </form>
          <div class="text-center mt-5 mb-5">
            <RouterLink class="btn btn-primary w-75 mt-2 mb-3" to="/index">登入</RouterLink>
            <RouterLink class="btn btn-primary w-75 mt-2 mb-3" to="/register">註冊</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

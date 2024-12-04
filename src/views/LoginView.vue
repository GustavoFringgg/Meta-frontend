<script setup>
import { ref } from 'vue'
const img = ref(
  'https://firebasestorage.googleapis.com/v0/b/metawall-a2771.appspot.com/o/local%2Fimg.svg?alt=media&token=0cd7e380-7158-4632-9b3c-3f5766bc954c',
)
</script>

<template>
  <main>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="row shadow rounded p-5 bg-light border border-2 border-dark">
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <!-- 左側圖像 -->
          <img :src="img" alt="MetaWall Illustration" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <!-- 登入表單 -->
          <div class="text-center">
            <h1 class="text-primary fw-bold">MetaWall</h1>
            <p class="text-secondary">元宇宙展開全新社交圈</p>
          </div>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="email"
                required
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="password"
                required
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">登入</button>
          </form>
          <div class="text-center mt-3">
            <a href="#" class="text-decoration-none">註冊帳號</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

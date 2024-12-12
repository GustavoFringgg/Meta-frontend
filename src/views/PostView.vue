<script setup>
import axios from 'axios'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/Composables/useAlert.js'
const { showAlert } = useAlert()
const router = useRouter()
const localurl = 'http://localhost:3000'
const signInToken = ref('')
const getUserData = ref('')
const postContent = ref('')
///////////////////////////////////
const selectedImage = ref(null) // 儲存選擇的圖片檔案
const uploadType = ref('user') // 上傳類型，預設為 "user"
const fileInput = ref(null) // 引用隱藏的檔案輸入框
const uploadedFileUrl = ref(null) // 從後端返回的圖片 URL
// 觸發檔案選擇
const triggerFileUpload = () => {
  fileInput.value.click() // 觸發檔案輸入框的點擊事件
}
// 處理檔案選擇
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) {
    alert('請選擇圖片！')
    return
  }
  selectedImage.value = file // 儲存檔案
  uploadImage() // 自動上傳
}

// 上傳圖片到後端
const uploadImage = async () => {
  if (!selectedImage.value) {
    alert('未選擇圖片！')
    return
  }
  const formData = new FormData()
  formData.append('file', selectedImage.value) // 添加檔案
  formData.append('type', 'user') // 指定上傳類型
  try {
    const response = await axios.post(`${localurl}/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${signInToken.value}`,
      },
    })
    uploadedFileUrl.value = response.data.fileUrl // 獲取圖片 URL
    showAlert('圖片上傳成功', 'success')
  } catch (error) {
    console.error('上傳失敗：', error)
    alert('圖片上傳失敗！')
  }
}
// 送出貼文
const submitPost = async () => {
  if (!postContent.value) {
    showAlert('請輸入貼文內容', 'error')
    return
  }
  const postData = {
    content: postContent.value,
    image: uploadedFileUrl.value, // 圖片 base64
  }
  const res = await axios.post(`${localurl}/posts/`, postData, {
    headers: {
      Authorization: `Bearer ${signInToken.value}`,
    },
  })
  postContent.value = ''
  uploadedFileUrl.value = ''
  showAlert('新增成功', 'success')
}

////////////////////////////////

const signCheck = async () => {
  signInToken.value = document.cookie.replace(/(?:(?:^|.*;\s*)Token\s*\=\s*([^;]*).*$)|^.*$/, '$1')

  if (!signInToken.value) {
    showAlert(`請登入`, 'error')
    router.push({ path: '/' })
  }
  try {
    const res = await axios.get(`${localurl}/users/checkout`, {
      headers: {
        Authorization: `Bearer ${signInToken.value}`,
      },
    })
    getUserData.value = res.data
  } catch (error) {
    showAlert(`${error.response.data.message}`, 'error')
    router.push({ path: '/' })
    // setTimeout(() => {
    //   nextTick(() => {
    //     location.reload() // 強制刷新頁面，保證渲染完成後再重新加載
    //   })
    // }, 500)
  }
}

signCheck()
</script>

<template>
  <!-- Header -->
  <header class="row align-items-center border-bottom border-3 border-dark p-3 bg-white">
    <div class="col">
      <h1 class="fs-4 m-0">MetaWall</h1>
      <RouterLink class="fs-4 m-0" to="/index">MetaWall</RouterLink>
    </div>
    <div class="col-auto d-flex align-items-center">
      <span class="me-2">Member</span>

      <img
        :src="getUserData.user?.photo"
        alt="Avatar"
        class="rounded-circle"
        style="width: 40px; height: 40px"
      />
    </div>
  </header>

  <div class="container">
    <!-- Main Section -->
    <div class="row mt-4">
      <!-- Main Content -->
      <main class="col-lg-9">
        <!-- Filter and Search -->
        <div class="card">
          <div class="card-header text-center">
            <h5 class="m-0">張貼動態</h5>
          </div>
          <div class="card-body">
            <!-- 貼文內容 -->
            <div class="mb-3">
              <label for="postContent" class="form-label">貼文內容</label>
              <textarea
                id="postContent"
                v-model="postContent"
                class="form-control"
                rows="4"
                placeholder="輸入您的貼文內容"
              ></textarea>
            </div>
            <!-- 上傳圖片 -->
            <div class="mb-3">
              <div>
                <!-- 上傳檔案按鈕 -->
                <button class="btn btn-primary" @click="triggerFileUpload">上傳圖片</button>
                <!-- 隱藏檔案選擇框 -->
                <input ref="fileInput" type="file" class="d-none" @change="handleImageUpload" />
              </div>
            </div>
            <!-- 圖片預覽 -->
            <div v-if="uploadedFileUrl" class="mb-3">
              <img :src="uploadedFileUrl" alt="Image Preview" class="img-fluid rounded" />
            </div>
            <!-- 送出貼文 -->
            <button class="btn btn-secondary w-100" @click="submitPost">送出貼文</button>
          </div>
        </div>
      </main>

      <!-- Sidebar -->
      <aside class="col-lg-3">
        <div class="card">
          <div class="card-body text-center">
            <button class="btn btn-primary w-100 mb-3">張貼動態</button>
            <div class="d-flex flex-column align-items-start">
              <div class="d-flex align-items-center mb-3">
                <img
                  :src="getUserData.user?.photo"
                  alt="Avatar"
                  class="rounded-circle me-2"
                  style="width: 50px; height: 50px"
                />
                <span>邊緣小杰</span>
              </div>
              <button class="btn btn-light w-100 text-start mb-2">
                <i class="bi bi-bell"></i> 追蹤名單
              </button>
              <button class="btn btn-light w-100 text-start">
                <i class="bi bi-hand-thumbs-up"></i> 我按讚的文章
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

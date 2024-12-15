<script setup>
import axios from 'axios'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/Composables/useAlert.js'
import dayjs from 'dayjs'

const { showAlert } = useAlert()
const router = useRouter()
const localurl = 'http://localhost:3000'
const signInToken = ref('') //user token存取
const getUserData = ref('') //user 個人資料存取
const searchPost = ref('') //收尋文章關鍵字存取
const getUserPost = ref([]) //取的使用者文章
const isLoading = ref(true) //判斷是否在loding
const comments = ref([]) // 留言列表
const newComment = ref('') // 新的留言內容

const getPost = async (timeSort = 'desc') => {
  const res = await axios.get(`${localurl}/posts/`, {
    params: { timeSort, keyword: searchPost.value },
  })
  comments.value = res.data.message
  console.log('resdata', comments.value)

  getUserPost.value = res.data.message.map((post) => ({
    ...post,
    formattedDate: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'),
  })) // 格式化日期
}

const handleSortChange = (event) => {
  const selectedSort = event.target.value // 獲取選中的排序條件
  getPost(selectedSort) // 呼叫 API，傳入對應的排序條件
}

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

// 提交留言
const submitComment = async (postId) => {
  const commentText = {
    comment: newComment.value,
  }
  if (!newComment.value || !newComment.value.trim()) {
    alert('請輸入留言！')
    return
  }
  try {
    const res = await axios.post(`${localurl}/posts/${postId}/comment`, commentText, {
      headers: {
        Authorization: `Bearer ${signInToken.value}`,
      },
    })

    // 將新留言加入到對應的貼文留言列表中
    // const post = post.value.find((post) => post.id === postId)
    // if (post) {
    //   post.comments.push(res.data.comment)
    // }

    newComment.value = '' // 清空輸入框
    getPost()
  } catch (error) {
    console.error(`留言失敗：`, error)
  }
}
//
onMounted(async () => {
  try {
    await signCheck()
    if (signInToken.value) {
      await getPost()
    } else {
      router.push({ path: '/' })
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-text">載入中...</div>
    </div>
    <div>
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
            <div class="d-flex mb-4">
              <select class="form-select w-auto me-2" @change="handleSortChange">
                <option value="desc">最新貼文</option>
                <option value="asc">最舊貼文</option>
                <option value="hot">熱門貼文</option>
              </select>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="搜尋貼文"
                  v-model="searchPost"
                />
                <button class="btn btn-primary" @click="getPost">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <!-- Posts -->
            <div class="mb-3" v-for="(post, index) in getUserPost" :key="post._id">
              <div class="card">
                {{ post._id }}
                <div class="card-body border-style">
                  <div class="d-flex align-items-center mb-3">
                    <img
                      :src="post.user.photo"
                      alt="Avatar"
                      class="rounded-circle me-2"
                      style="width: 50px; height: 50px"
                    />
                    <div>
                      <h6 class="m-0">{{ post.user.name }}</h6>
                      <small class="text-muted"> {{ post.formattedDate }}</small>
                    </div>
                  </div>
                  <p>{{ post.content }}</p>
                  <img :src="post.image" class="img-fluid rounded" v-if="post.image" />
                  <!-- 留言區域 -->
                  <div class="card-footer">
                    <div class="mb-3">
                      <input
                        type="text"
                        v-model="newComment"
                        class="form-control"
                        placeholder="留言..."
                      />
                    </div>

                    <button class="btn btn-primary" @click="submitComment(post._id)">留言</button>
                    <!-- 顯示留言列表 -->
                    <ul class="list-group list-group-flush mt-3">
                      <li
                        v-for="comment in post.comments"
                        :key="comment.id"
                        class="list-group-item"
                      >
                        {{ comment.user.name }}<strong>{{ comment.comment }}</strong>
                        <span class="text-muted"> {{ comment.createdAt }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <!-- Sidebar -->
          <aside class="col-lg-3">
            <div class="card">
              <div class="card-body text-center">
                <RouterLink class="btn btn-primary w-100 mb-3 text-decoration-none" to="/userpost"
                  >張貼動態</RouterLink
                >
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
    </div>
  </div>
</template>

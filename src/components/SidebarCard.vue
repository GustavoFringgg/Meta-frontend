<script setup>
defineProps({
  getUserData: Object,
})
</script>

<template>
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
            <span>{{ getUserData.user?.name }}</span>
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
</template>

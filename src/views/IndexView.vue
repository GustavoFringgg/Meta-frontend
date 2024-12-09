<script setup></script>

<template>
  <!-- Header -->
  <header class="row align-items-center border-bottom border-3 border-dark p-3 bg-white">
    <div class="col">
      <h1 class="fs-4 m-0">MetaWall</h1>
    </div>
    <div class="col-auto d-flex align-items-center">
      <span class="me-2">Member</span>
      <img src="#" alt="Avatar" class="rounded-circle" style="width: 40px; height: 40px" />
    </div>
  </header>
  <div class="container">
    <!-- Main Section -->
    <div class="row mt-4">
      <!-- Main Content -->
      <main class="col-lg-9">
        <!-- Filter and Search -->
        <div class="d-flex mb-4">
          <select class="form-select w-auto me-2">
            <option>最新貼文</option>
            <option>熱門貼文</option>
          </select>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="搜尋貼文" />
            <button class="btn btn-primary"><i class="bi bi-search"></i></button>
          </div>
        </div>

        <!-- Posts -->
        <div class="mb-3">
          <div class="card">
            <div class="card-body border-style">
              <div class="d-flex align-items-center mb-3">
                <img
                  src="#"
                  alt="Avatar"
                  class="rounded-circle me-2"
                  style="width: 50px; height: 50px"
                />
                <div>
                  <h6 class="m-0">邊緣小杰</h6>
                  <small class="text-muted">2023/1/10 12:00</small>
                </div>
              </div>
              <p>外面看起來就超冷... 我決定回被窩繼續睡覺... >.<</p>
              <img src="#" class="img-fluid rounded" />
            </div>
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
                  src="#"
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

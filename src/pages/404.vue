<template>
  <div class="fourzerofour">
    <div class="inner">
      <h1>404. Whoops!</h1>
      <p>Internet quá rộng lớn, đừng để lạc mất nhau!</p>
      <g-link to="/" class="btn btn-light">Quay lại trang chủ</g-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fourzerofour {
  margin-left: 320px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/images/404-image.jpg") no-repeat;
  background-size: cover;
  color: #fff;
  @media (max-width: 1400px) {
    margin-left: 200px;
  }
  @media (max-width: $breakpoint-sm) {
    margin-left: 0;
  }
  @media (max-width: $breakpoint-xs) {
    height: calc(100vh - 50px);
    background-size: auto 100%;
    background-position: center top;
  }
  h1 {
    font-size: 3rem;
    @media (max-width: $breakpoint-xs) {
      font-size: 28px;
    }
  }
  p {
    font-size: 2rem;
    margin-bottom: 15px;
    @media (max-width: $breakpoint-xs) {
      font-size: 18px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .btn {
    font-size: 1.1rem;
    padding-top: 10px;
    padding-bottom: 10px;
    &:hover {
      color: #fff;
    }
  }
  > .inner {
    text-align: center;
    @media (max-width: $breakpoint-xs) {
      background: rgba(0, 0, 0, 0.5);
      height: calc(100vh - 50px);
    }
  }
}
</style>
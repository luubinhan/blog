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
  background: url("./images/yoann-boyer-156510.jpg") no-repeat;
  background-size: cover;
  color: #fff;
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 2rem;
    margin-bottom: 15px;
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
  }
}
</style>
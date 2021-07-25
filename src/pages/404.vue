<template>
  <div class="fourzerofour">
    <div class="inner">
      <h1>404. Whoops!</h1>
      <p>Internet quá rộng lớn, đừng để lạc mất nhau!</p>
      <g-link to="/" class="btn btn-primary">Quay lại trang chủ</g-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fourzerofour {
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
  flex-direction: column;
  @include mobile {
    background-size: auto 100%;
    background-position: center top;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  h1 {
    font-size: 3rem;
    @include mobile {
      font-size: 28px;
    }
  }
  p {
    font-size: 2rem;
    margin-bottom: 15px;
    @include mobile {
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
    position: relative;
    z-index: 1;
  }
}
</style>
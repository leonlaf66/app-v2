<template>
  <div class="tabs">
    <ul>
      <router-link :to="{name:'home'}" tag="li" exact>
        <div>
          <i class="icon iconfont icon-home"></i>
        </div>
        <div>{{ 'HOME' | $tt('首页') }}</div>
      </router-link>
      <router-link :to="{name:'yellowpage'}" tag="li">
        <div>
          <i class="icon iconfont icon-shangjia"></i>
        </div>
        <div>{{ 'SERVICE' | $tt('管房') }}</div>
      </router-link>
      <router-link :to="{name:'news'}" tag="li">
        <div>
          <i class="icon iconfont icon-xinwen"></i>
        </div>
        <div>{{ 'NEWS' | $tt('新闻') }}</div>
      </router-link>
      <router-link :to="{name:'my'}" tag="li">
        <div>
          <i class="icon iconfont icon-my"></i>
        </div>
        <div>{{ 'MY' | $tt('我的') }}</div>
      </router-link>
      <router-link :to="{name:'more'}" tag="li">
        <div>
          <i class="icon iconfont icon-more"></i>
        </div>
        <div>{{ 'MORE' | $tt('更多') }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'footer-nav'
}
</script>

<style lang="scss">
  .tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px #000;
    width: 100%;
    box-shadow: 0 0 10PX 0 rgba(155,143,143,0.6);
    -webkit-box-shadow: 0 0 10PX 0 rgba(155,143,143,0.6);
    -moz-box-shadow: 0 0 10PX 0 rgba(155,143,143,0.6);
    & > ul, & > ul > li {
      margin: 0;
      padding: 0;
    }
    ul {
      display: table;
      width: 100%;
      & > li {
        text-align: center;
        font-size: 13px;
        display: table-cell;
        padding: 3px 0;
        cursor: pointer;
        &.router-link-active{
          color: #D0021B;
        }
        & > div {
          font-size: 13px;
          & > i {
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
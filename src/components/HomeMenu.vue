<template>
  <ul class="home-nav lay-row">
    <li class="lay-col">
      <a href="javascript:void(0)" class="high-text" @click="$router.push({name: 'house-search', params: {type: 'purchase'}})">
        <i class="iconfont icon-maifang"></i>
        {{ 'BUY & SELL' | $tt('房屋购买') }}
      </a>
    </li>
    <!--
    <li>
      <a href="javascript:void(0)" style="color:#c93833" @click="$router.push({name: 'school-district'})">
        <i class="iconfont icon-xuequ"></i>
        优质学区
      </a>
    </li>
    -->
    <li class="lay-col">
      <a href="javascript:void(0)" class="high3-text" @click="$router.push({name: 'house-search', params: {type: 'lease'}})">
        <i class="iconfont icon-zufang"></i>
        {{ 'RENTAL' | $tt('房屋租赁') }}
      </a>
    </li>
    <li class="lay-col">
      <a href="javascript:void(0)" class="high2-text" @click="$router.push({name: 'buy-house-flow'})">
        <i class="iconfont icon-liucheng"></i>
        {{ 'WORKFLOW' | $tt('买房流程') }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'home-menu'
}
</script>

<style lang="scss">
  .home-nav {
    background:linear-gradient(360deg,#fbf9fe,#ddd);
    margin:0 13px;
    margin-top: -60px;
    border-radius: 6px 6px 0 0;
    text-align:center;
    > li {
      width:33.33333%;
      &:first-child a{
        border-left-width:0;
      }
      > a {
        display:block;
        margin: 0 auto;
        padding: 5px 0;
        border-left:solid 1px #ddd;
        &:active {
          background:#fff;
        }
        > i {
          display: block;
          font-size:32px;
          margin-bottom:4px;
        }
      }
    }
  }
</style>
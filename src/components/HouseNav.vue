<template>
  <div class="house-tabs disabled">
    <ul>
      <li @click="handler('question')">
        <div>
          <i class="icon iconfont icon-question"></i>
        </div>
        <div>{{ 'Question' | $tt('答疑') }}</div>
      </li>
      <li @click="handler('loan')">
        <div>
          <i class="icon iconfont icon-daikuan"></i>
        </div>
        <div>{{ 'Mortgage' | $tt('贷款') }}</div>
      </li>
      <li @click="handler('tour')">
        <div>
          <i class="icon iconfont icon-kanfang"></i>
        </div>
        <div>{{ 'Go Tour' | $tt('看房') }}</div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'house-nav',
  methods: {
    handler (type) {
      this.$emit('item-click', type)
    }
  }
}
</script>

<style lang="scss">
  .house-tabs {
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
    &.disabled {
      color:#aaa;
    }
  }
</style>
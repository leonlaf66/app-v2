<template>
  <div class="house-tabs disabled">
    <ul>
      <li @click="showContactUs = true">
        <div>
          <i class="icon iconfont icon-kefu"></i>
        </div>
        <div>{{ 'Contact Us' | $tt('联系我们') }}</div>
      </li>
      <!--
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
      -->
    </ul>
    <div v-transfer-dom>
      <popup class="contact-us-popup" v-model="showContactUs" position="bottom">
        <group>
          <div class="title" slot="title">
            <div style="padding:8px 5px">
              <i class="iconfont icon-kefu"></i>
              {{ 'Contact Us' | $tt('联系我们') }}
            </div>
          </div>
          <cell v-for="item in contactItems" :title="item.title | $tt" :value="item.value" :key="item.title"></cell>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom'
import Popup from 'vux/src/components/popup'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

export default {
  name: 'house-nav',
  data () {
    return {
      showContactUs: false,
      contactItems: [
        {
          'title': ['Mobile', '移动电话'],
          'value': '+086 15680728360'
        },
        {
          'title': ['Tel', '座机'],
          'value': '888-610-3288'
        },
        {
          'title': ['Email', '邮箱'],
          'value': 'contact@usleju.com'
        },
        {
          'title': ['WeChat', '微信ID'],
          'value': 'woniuusa'
        }
      ]
    }
  },
  methods: {
    handler (type) {
      this.$emit('item-click', type)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    Cell
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
  .route-house-detail .vux-no-group-title {
    margin-top:0;
  }
</style>
<template>
  <div class="house-tabs disabled">
    <ul>
      <li @click="showTour = true">
        <div>
          <i class="icon iconfont icon-kanfang"></i>
        </div>
        <div>{{ 'Go Tour' | $tt('看房') }}</div>
      </li>
      <!--
      <li @click="handler('loan')">
        <div>
          <i class="icon iconfont icon-daikuan"></i>
        </div>
        <div>{{ 'Mortgage' | $tt('贷款') }}</div>
      </li>
      -->
      <li @click="onClickQuestion">
        <div>
          <i class="icon iconfont icon-question"></i>
        </div>
        <div>{{ 'Question' | $tt('答疑') }}</div>
      </li>
      <li @click="showContactUs = true">
        <div>
          <i class="icon iconfont icon-kefu"></i>
        </div>
        <div>{{ 'Contact' | $tt('联系') }}</div>
      </li>
    </ul>
    <div v-transfer-dom>
      <popup class="contact-us-popup" v-model="showContactUs" position="bottom">
        <contacts></contacts>
      </popup>

      <popup class="tour-us-popup" v-model="showTour" position="bottom">
        <house-tour :house="house" @confirm="showTour = false"></house-tour>
      </popup>
    </div>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom'
import Popup from 'vux/src/components/popup'
import HouseTour from '@/components/house/tour'
import Contacts from '@/components/contacts'

export default {
  name: 'house-nav',
  props: {
    house: {
      require: true,
      default: {}
    }
  },
  data () {
    return {
      showContactUs: false,
      showTour: false,
      tourValue: []
    }
  },
  methods: {
    onClickQuestion () {
      window.LC_API.open_chat_window()
    },
    handler (type) {
      this.$emit('item-click', type)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    HouseTour,
    Contacts
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
<template>
  <div class="house-tabs">
    <ul>
      <li v-for="item of navItems" @click="item.handler()" v-if="!item.vif || item.vif()">
        <div>
          <i class="icon iconfont" :class="'icon-' + item.icon"></i>
        </div>
        <div>{{ $tt(item.title) }}</div>
      </li>
    </ul>
    <div v-transfer-dom>
      <popup class="tour-us-popup" v-model="showTour" position="bottom">
        <house-tour :house="house" @confirm="onHouseToured"></house-tour>
      </popup>
      <popup class="mortgage-popup" v-model="showMortgage" position="bottom">
        <house-mortgage ref="house-mortgage" :house="house"></house-mortgage>
      </popup>
      <popup class="contact-us-popup" v-model="showContactUs" position="bottom">
        <contacts :house="house"></contacts>
      </popup>
    </div>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom'
import Popup from 'vux/src/components/popup'
import HouseTour from '@/components/house/tour'
import HouseMortgage from '@/components/house/mortgage'
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
    let self = this
    return {
      navItems: [
        {
          title: ['Go Tour', '看房'],
          icon: 'kanfang',
          handler () {
            self.showTour = true
          }
        },
        {
          title: ['Mortgage', '贷款'],
          icon: 'daikuan',
          handler () {
            self.showMortgage = true
            self.$refs['house-mortgage'].load(self.house.price, self.house.taxes)
          },
          vif () {
            return self.house.prop !== 'RN'
          }
        },
        {
          title: ['Question', '答疑'],
          icon: 'question',
          handler () {
            self.onClickQuestion()
          }
        },
        {
          title: ['Contact', '联系'],
          icon: 'kefu',
          handler () {
            self.showContactUs = true
          }
        }
      ],
      showMortgage: false,
      showTour: false,
      showContactUs: false,
      tourValue: []
    }
  },
  methods: {
    onClickQuestion () {
      window.LC_API.open_chat_window()
    },
    onHouseToured () {
      this.showTour = false
      this.$vux.toast.show({
        type: 'success',
        text: this.$tt('Completed reservation', '已完成预约')
      })
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
    HouseMortgage,
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
<template>
  <div class="yellow-page-detail has-fixed-header" v-if="is_online">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回')}">
      {{ data.name }}
    </x-header>
    <div class="image-box">
      <img :src="data.photo_url">
    </div>
    <div class="general-info">
      <rater class="rater" v-model="data.rating" :font-size="20" disabled></rater>
      <div class="description">{{ data.intro || $tt('No description', '暂无简介') }}</div>
    </div>
    <group>
      <cell :title="'Business' | $tt('业务范围')" :value="data.business" align-items="flex-start"></cell>
      <cell :title="'License' | $tt('许可证')" :value="data.license" align-items="flex-start"></cell>
      <cell :title="'Contact' | $tt('联系人')" :value="data.contact"></cell>
      <cell :title="'Phone' | $tt('联系电话')" :value="data.phone"></cell>
      <cell :title="'Email Address' | $tt('邮箱')" :value="data.email"></cell>
      <cell :title="'Address' | $tt('地址')" :value="data.address" align-items="flex-start"></cell>
      <cell :title="'Website' | $tt('网址')" :value="data.website" align-items="flex-start"></cell>
    </group>
  </div>
</template>


<script>
import XHeader from 'vux/src/components/x-header'
import Cell from 'vux/src/components/cell'
import Group from 'vux/src/components/group'
import Rater from 'vux/src/components/rater'

export default {
  data () {
    return {
      is_online: false,
      data: {
        type: {
          id: '',
          name: ''
        }
      }
    }
  },
  created () {
    this.is_online = true
    this.load()
  },
  methods: {
    load () {
      this.$ypApi(`item/` + this.$route.params.id).then(data => {
        this.$setPageTitle(data.name)
        this.data = data
      })
    }
  },
  beforeDestroy () {
    this.is_online = true
    this.data = {
      type: {
        id: '',
        name: ''
      }
    }
  },
  components: {
    XHeader,
    Cell,
    Group,
    Rater
  }
}
</script>

<style lang="scss">
.yellow-page-detail {
  .image-box {
    text-align:center;
    background:#fff;
    border-bottom:solid 1px #eee;
    height:220px;
    > img {
      display:inline-block;
      max-width:100%;
    }
  }
  .general-info {
    padding: 0 10px;
    text-align: right;
    padding-bottom: 0;
    .description {
      margin-top: 10px;
      margin-bottom:10px;
      text-align:left;
    }
  }

  .rater {
    margin-top:10px;
  }

  .vux-label {
    white-space: nowrap;
  }

  .weui-cell {
    padding-left:10px;
    font-size:13px;
    &:before {
      left:0;
    }
  }
}
</style>
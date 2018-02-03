<template>
  <x-dialog v-model.sync="value" class="write-comment-dialog">
    <popup-header :title="'Write Comments' | $tt('书写评价')"></popup-header>
    <div class="form-content">
      <group>
        <cell :title="'Rating' | $tt('评分')">
          <rater v-model="rating"></rater>
        </cell>
      </group>
      <x-textarea v-model="content"
        :show-counter="true"
        :placeholder="'Write comments here' | $tt('在这儿书写评价')"
        :max="200"
        :rows="7"
        :autosize="true"></x-textarea>
      <flexbox :gutter="0">
        <flex-item>
          <x-button @click.native = "$emit('input', false)">{{ 'Cancel' | $tt('取消') }}</x-button>
        </flex-item>
        <flex-item>
          <x-button type="primary" @click.native="onClickConfirm">{{ 'Submit' | $tt('提交') }}</x-button>
        </flex-item>
      </flexbox>
    </div>
  </x-dialog>
</template>

<script>
import XDialog from 'vux/src/components/x-dialog'
import PopupHeader from 'vux/src/components/popup-header'

import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import Rater from 'vux/src/components/rater'
import XTextarea from 'vux/src/components/x-textarea'
import Flexbox from 'vux/src/components/flexbox/flexbox'
import FlexItem from 'vux/src/components/flexbox/flexbox-item'
import XButton from 'vux/src/components/x-button'

export default {
  props: {
    value: {
      type: Boolean
    },
    catName: {
      require: true,
      type: String
    },
    catId: {
      require: true,
      type: Number
    }
  },
  data () {
    return {
      rating: 0,
      content: ''
    }
  },
  methods: {
    onClickConfirm () {
      if (parseInt(this.rating) === 0) {
        this.$vux.alert.show({
          title: this.$tt('Notice', '提示'),
          content: this.$tt('Please select rating', '请选择分数')
        })
        return false
      }

      if (!this.content || this.content.length <= 10) {
        this.$vux.alert.show({
          title: this.$tt('Notice', '提示'),
          content: this.$tt('评论内容至少10个字符', '评论内容至少10个汉字!')
        })
        return false
      }

      let data = {
        rating: this.rating,
        content: this.content
      }

      this.$commentApi(`/submit/${this.catName}/${this.catId}`, {
        data,
        method: 'post'
      }).then((result) => {
        this.rating = 0
        this.content = ''
        this.$emit('changed', result)
        this.$emit('input', false)
      })
    }
  },
  components: {
    XDialog,
    PopupHeader,
    Group,
    Cell,
    Rater,
    XTextarea,
    Flexbox,
    FlexItem,
    XButton
  }
}
</script>

<style lang="scss">
.write-comment-dialog {
  .form-content {
    text-align:left;
  }
  .weui-cells {
    margin-top:0;
  }
  .vux-label {
    color:#777;
  }
  .weui-btn {
    border-radius:0;
    &:after {
      border-radius:0;
    }
  }
}
</style>
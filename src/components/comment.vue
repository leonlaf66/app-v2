<template>
  <div class="comment-container">
    <div class="toolbar">
      <a class="col col1 summery" @click="onClickReviews">Reviews ({{ items.length }})</a>
      <a class="col col2 btn-go-reviews" @click="onClickWriteComments">写评价</a>
    </div>
    <div v-transfer-dom>
      <popup v-model="showList" position="right" class="popup-comments">
        <div style="width:85vw;" class="items vux-1px-t" v-if="items.length > 0">
          <div class="item" v-for="item of items" :key="item.id">
            <p>
              {{ item.content }}
            </p>
            <div class="info">
              <span class="left">
                <template v-if="item.user && item.user.id">
                  {{ item.user.name }}
                </template>
                <template v-else>
                  {{ 'Anonymous' | $tt('匿名') }}
                </template>
              </span>
              <span class="right">
                {{ item.created_at }}
              </span>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <dialog-form :catName="catName" :catId="catId" v-model="showWriteForm" @changed="onCommitChanged"></dialog-form>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom/index.js'
import Popup from 'vux/src/components/popup'
import DialogForm from './comment/dialog-form'

export default {
  props: {
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
      items: [],
      showWriteForm: false,
      showList: false
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      this.$commentApi(`/list/${this.catName}/${this.catId}`).then((items) => {
        this.items = items
      })
    },
    onClickReviews () {
      if (this.items.length > 0) {
        this.showList = true
      }
    },
    onClickWriteComments () {
      if (!this.$store.state.account.user) {
        this.$router.push({name: 'login'})
        return false
      }
      this.showWriteForm = true
    },
    onCommitChanged (result) {
      this.items.splice(0, 0, result)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    DialogForm
  }
}
</script>

<style lang="scss">
.comment-container {
  .toolbar {
    font-size:0;
    padding:0 10px;
    margin-bottom:10px;
    .col {
      display:inline-block;
      font-size:14px;
      width:50%;
      text-align:center;
      padding: 10px 0;
      box-sizing: border-box;
      border:solid 1px #C7C7C7;
    }
    .col1 {
      border-right-width:0;
      border-radius: 8px 0 0 8px;
    }
    .col2 {
      border-color:#99bd2a;
      background-color:#99bd2a;
      color:#fff;
      border-radius: 0 8px 8px 0;
    }
  }
}

.popup-comments {
  .items {
    .item {
      padding:5px 10px;
      margin-bottom:5px;
      background-color:#fff !important;
    }
    .info {
      position:relative;
      font-size:13px;
      color:#aaa;
      .right {
        position:absolute;
        right:0;
      }
    }
    > .item > p {
      padding:10px 0;
    }
  }
}

.write-comment-dialog {
  .weui-dialog {
    max-width:400px;
    width:90%;
  }
}
</style>
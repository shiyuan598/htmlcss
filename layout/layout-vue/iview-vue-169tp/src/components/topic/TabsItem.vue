<template>
  <div class="container">
    <Tabs class="tabs" v-model="currentName">
      <TabPane :key="item.name" :name="item.name" v-for="item in tabsList" :label="item.name">
        <div class="tab-content">
          <a :key="data.name" @click="itemClick(data.name)" :href="data.href" v-for="data in item.content">
            {{data.name}}
          </a>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import eventBus from '../../util/eventBus'

export default {
  name: 'TabsItem',
  data () {
    return {
      currentName: '',
      tabsList: [
        {
          name: '友情链接',
          content: [
            {
              name: '妹子图',
              href: 'javascript:;'
            },
            {
              name: '漂漂美术馆',
              href: 'javascript:;'
            },
            {
              name: '性感美女',
              href: 'javascript:;'
            }
          ]
        },
        {
          name: '合作伙伴',
          content: [
            {
              name: '百度一下',
              href: 'javascript:;'
            },
            {
              name: '美图秀秀',
              href: 'javascript:;'
            }
          ]
        },
        {
          name: '网站导航',
          content: [
            {
              name: '性感美女',
              href: 'javascript:;'
            },
            {
              name: '高跟丝袜',
              href: 'javascript:;'
            }
          ]
        }
      ],
      categoryDetails: [
        {
          title: '性感美女',
          imgList: [
            {
              name: '女神在大自然里華村あ',
              src: './static/images/1_051G4143X145.jpg'
            },
            {
              name: '心往神驰的小萝莉瀬名きら',
              src: './static/images/1_051Q55T09206.jpg'
            },
            {
              name: '东瀛女孩的日常塩地美澄',
              src: './static/images/1_051G4061T604.jpg'
            },
            {
              name: '美女山崎真実写真大片',
              src: './static/images/1_051G410123513.jpg'
            },
            {
              name: '极致感性女神戸田れい',
              src: './static/images/1_0516153ZAC4.jpg'
            }
          ]
        },
        {
          title: '高跟丝袜',
          imgList: [
            {
              name: '颓废的私人玩物美眉',
              src: './static/images/1_051Q614224H2.jpg'
            },
            {
              name: '可爱小猫咪牛仔裤美臀',
              src: './static/images/1_051G40J32c7.jpg'
            },
            {
              name: '发条少女勇敢露脸爆照',
              src: './static/images/1_05141601503361.jpg'
            },
            {
              name: '蕾丝萝莉妹妹懒洋洋',
              src: './static/images/1_05161543092910.jpg'
            },
            {
              name: '白富美小姐姐节日狂欢',
              src: './static/images/1_051G41233Q02.jpg'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.currentName = this.tabsList[0].name
    if (this.$route.params.index) {
      this.currentName = this.tabsList[this.$route.params.index].name
    }
  },
  methods: {
    itemClick (name) {
      let category = this.categoryDetails.filter(item => item.title === name)
      if (category) {
        eventBus.$emit('topic', category[0])
        this.$router.push({ name: 'CategoryItem', params: { category: category[0] }, query: { t: Date.now() } })
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 15px auto 20px auto;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 65vw;
}

.tabs {
  background-color: #fff;
}

.tab-content {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  height: 3rem;
}

.tab-content a {
  display: -webkit-flex;
  display: flex;
  flex-basis: 6rem;
  color: #323436;
  font-size: 0.875rem;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

.tab-content a:hover {
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}
</style>

<template>
  <div class="container">
    <div class="left">
      <ul>
        <li :class="currentTopic === index ? 'current' : ''" :key="index" v-for="(topic, index) in topicList" @click="topicClick(topic, index)">{{topic.name}}</li>
      </ul>
    </div>
    <div id="content">
      <router-view :key="$route.query.t" />
    </div>
  </div>
</template>

<script>
import OverView from '@/components/OverView'
import CategoryItem from '@/components/CategoryItem'
import TabsItem from '@/components/TabsItem'
import eventBus from '../util/eventBus'

export default {
  components: { OverView, CategoryItem, TabsItem },
  data () {
    return {
      currentTopic: 0,
      topicList: [
        {
          name: '首页',
          href: 'https://www.169tp.com'
        },
        {
          name: '导航标签',
          href: 'https://www.169tp.com'
        },
        {
          name: '性感美女',
          href: 'https://www.169tp.com/xingganmeinv/'
        },
        {
          name: '网友自拍',
          href: 'https://www.169tp.com/wangyouzipai/'
        },
        {
          name: '高跟丝袜',
          href: 'https://www.169tp.com/gaogensiwa/'
        },
        {
          name: '国内美女',
          href: 'https://www.169tp.com/guoneimeinv/'
        },
        {
          name: '日本美女',
          href: 'https://www.169tp.com/guoneimeinv/'
        }
      ],
      categoryDetails: [
        {
          title: '手机壁纸',
          imgList: [
            {
              name: '插画中的美女',
              src: './static/images/1_10060612251102.jpg'
            },
            {
              name: '手机壁纸收藏',
              src: './static/images/1_1006061034TU.jpg'
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: './static/images/1_10060609459629.jpg'
            },
            {
              name: '沙漠掠影高清图片下载',
              src: './static/images/1_1006060R613O.jpg'
            },
            {
              name: '山河美色iphone plus壁纸',
              src: './static/images/1_1006060I0DH.jpg'
            }
          ]
        },
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
          title: '网友自拍',
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
        },
        {
          title: '高跟丝袜',
          imgList: [
            {
              name: '插画中的美女',
              src: './static/images/1_10060612251102.jpg'
            },
            {
              name: '手机壁纸收藏',
              src: './static/images/1_1006061034TU.jpg'
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: './static/images/1_10060609459629.jpg'
            },
            {
              name: '沙漠掠影高清图片下载',
              src: './static/images/1_1006060R613O.jpg'
            },
            {
              name: '山河美色iphone plus壁纸',
              src: './static/images/1_1006060I0DH.jpg'
            }
          ]
        },
        {
          title: '国内美女',
          imgList: [
            {
              name: '插画中的美女',
              src: './static/images/1_10060612251102.jpg'
            },
            {
              name: '手机壁纸收藏',
              src: './static/images/1_1006061034TU.jpg'
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: './static/images/1_10060609459629.jpg'
            },
            {
              name: '沙漠掠影高清图片下载',
              src: './static/images/1_1006060R613O.jpg'
            },
            {
              name: '山河美色iphone plus壁纸',
              src: './static/images/1_1006060I0DH.jpg'
            }
          ]
        },
        {
          title: '日本美女',
          imgList: [
            {
              name: '插画中的美女',
              src: './static/images/1_10060612251102.jpg'
            },
            {
              name: '手机壁纸收藏',
              src: './static/images/1_1006061034TU.jpg'
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: './static/images/1_10060609459629.jpg'
            },
            {
              name: '沙漠掠影高清图片下载',
              src: './static/images/1_1006060R613O.jpg'
            },
            {
              name: '山河美色iphone plus壁纸',
              src: './static/images/1_1006060I0DH.jpg'
            }
          ]
        },
        {
          title: '电脑壁纸',
          imgList: [
            {
              name: '插画中的美女',
              src: './static/images/1_10060612251102.jpg'
            },
            {
              name: '手机壁纸收藏',
              src: './static/images/1_1006061034TU.jpg'
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: './static/images/1_10060609459629.jpg'
            },
            {
              name: '沙漠掠影高清图片下载',
              src: './static/images/1_1006060R613O.jpg'
            },
            {
              name: '山河美色iphone plus壁纸',
              src: './static/images/1_1006060I0DH.jpg'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    eventBus.$on('topic', (category) => {
      for (let index = 0; index < this.topicList.length; index++) {
        const item = this.topicList[index]
        if (item.name === category.title) {
          this.currentTopic = index
          break
        }
      }
    })
  },
  methods: {
    topicClick (topic, index) {
      this.currentTopic = index
      if (index === 0) {
        // this.$router.push('/Subject/OverView')
        this.$router.push({ name: 'OverView', params: { userId: 123 }, query: { t: Date.now() } })
      } else if (index === 1) {
        this.$router.push({ name: 'TabsItem', params: { index: 2 }, query: { t: Date.now() } })
      } else {
        let category = this.categoryDetails.filter(item => item.title === topic.name)[0]
        this.$router.push({ name: 'CategoryItem', params: { category }, query: { t: Date.now() } })
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.left {
  margin-right: 30px;
  padding: 0 30px;
  font-size: 20px;
}
.left li {
  color: #323436;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
}

.left li:hover,
li.current {
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}

.content {
  flex-basis: 300px;
  flex-grow: 9;
}
</style>

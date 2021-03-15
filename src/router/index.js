import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/music_main/home'
  },
  {
    path: '/music_main',
    name: 'MusicMain',
    component: () => import('@/views/MusicMain'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: {
          title: '推荐',
          isAlive: true,
        },
      },
      {
        path: 'ranklist',
        name: 'RankList',
        component: () => import('@/views/rankList/RankList'),
        meta: {
          title: '排行榜',
          isAlive: true,
        },
      },
      {
        path: 'singer',
        name: 'Singers',
        component: () => import('@/views/singers/Singers'),
        meta: {
          title: '歌手',
          isAlive: true,
        },
      },
      {
        path: 'singer_detail/:singer_id',
        name: 'SingerDetail',
        component: () => import('@/views/singerDetail/SingerDetail'),
        children: [
          {
            path: 'careful_chose',
            name: 'SingerDetailCarefulChose',
            component: () => import('@/views/singerDetailCarefulChose/SingerDetailCarefulChose'),
            meta: {
              title: '精选歌曲',
              isAlive: false,
            },
          },
          {
            path: 'eps',
            name: 'SingerDetailEp',
            component: () => import('@/views/singerDetailEp/SingerDetailEp'),
            meta: {
              title: '专辑',
            },
          },
        ],
      },
      {
        path: 'ep_detail/:ep_id',
        name: 'EpDetail',
        component: () => import('@/views/epDetail/EpDetail'),
        meta: {
          title: '专辑详情',
          isAlive: false,
        },
      },
      {
        path: 'playlists',
        name: 'PlayLists',
        component: () => import('@/views/playLists/PlayLists'),
        meta: {
          title: '歌单',
          isAlive: true,
        },
      },
      {
        path: 'playlists_detail/:play_lists_id',
        name: 'PlayListsDetail',
        component: () => import('@/views/playlistsdetail/PlayListsDetail'),
        meta: {
          title: '歌单详情',
          isAlive: false,
        }
      },
      {
        path: 'user/:user_id',
        name: 'User',
        component: () => import('@/views/user/User'),
        meta: {
          title: '用户',
          isAlive: false,
        },
      },
      {
        path: 'lrc_detail/:song_id',
        name: "LrcDetail",
        component: () => import('@/views/lrcDetail/LrcDetail'),
        meta: {
          title: '歌词',
          isAlive: false,
        }
      },
      {
        path: 'search',
        name: "Search",
        component: () => import('@/views/search/Search'),
        meta: {
          title: '搜索',
          isAlive: false,
        }
      }
    ],
  },
  {
    path: '/playlists_manage',
    name: 'PlayListsManage',
    component: () => import('@/views/playListsManage/PlayListsManage'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('music_token')) {
        next();
      }else {
        next('/login');
      }
    },
    meta: {
      title: '歌单管理',
      needLogin: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    meta: {
      title: '登录/注册',
    }
  },
]


const router = new VueRouter({
  routes,
  mode: "hash",
});

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
}

router.beforeEach( (to, from, next) => {
  document.title = '想听音乐🎧-' + to.meta.title;
  if (to.meta.needLogin) {
    if (sessionStorage.getItem('music_token')) {
      next();
    }else {
      next('/login');
    }
  }else {
    next();
  }
})


export default router

import router from "@/router/index";

router.beforeEach( (to, from, next) => {
  document.title = '想听音乐🎧-' + to.meta.title;
  if (!sessionStorage.getItem('music_token')) {
    if (to.matched.length > 0 && !to.matched.some(value => value.meta.requireAuth)) {
      next();
    }else {
      next({
        path: '/login'
      })
    }
  }else {
    next();
  }
})
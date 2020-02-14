import router from './router'


import { getAdmin } from '@/utils/auth' // get token from cookie


// NProgress.configure({ showSpinner: false }) // NProgress Configuration

 const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
 // NProgress.start()

  // set page title
 // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = getAdmin().admin_token;

  if (token!=undefined) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
    }else{
        next(`/login`)
    }
    
  }
})

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })

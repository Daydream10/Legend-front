import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '@/store'

Vue.use(VueRouter)
/*
const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize').then(() => {
    if (!store.getters['auth/isAuthenticated']) {
      next('/login/identifier')
    } else {
      next()
    }
  })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize').then(() => {
    if (store.getters['auth/isAuthenticated']) {
      next('/')
    } else {
      next()
    }
  })
}

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout').then(() => next('/login/identifier'))
}
*/
const routes = [
  /* {
    path: '/auth',
    component: () => import('@/views/auth/Auth'),
    children: [
      {
        path: '/login',
        component: () => import('@/views/auth/Login'),
        children: [
          {
            path: 'identifier',
            name: 'identifier',
            component: () => import('@/views/auth/LoginIdentifier'),
            //    beforeEnter: requireUnauthenticated,
          },
          {
            path: 'password-reset',
            name: 'Password Reset',
            component: () => import('@/views/auth/PasswordReset'),
          },
          {
            path: '/password-reset/:uid/:token',
            name: 'Password Reset Confirm',
            component: () => import('@/views/auth/PasswordResetConfirm'),
          },
          {
            path: '/logout',
            //   beforeEnter: redirectLogout,
          },
        ],
      },
    ],
  },*/
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'tables' */ '../views/pages/Login.vue')
  },
  {
    path: '/pages',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: 'Lock',
        path: 'lock',
        component: () => import('@/views/pages/Lock')
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/pages/Login')
      },
      {
        name: 'Pricing',
        path: 'pricing',
        component: () => import('@/views/pages/Pricing')
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('@/views/pages/Register')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),

    // beforeEnter: requireAuthenticated,
    children: [
      // Dashboard - Level 1 - Projects
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard')
      },

      // Pages
      {
        name: 'RTL',
        path: 'pages/rtl',
        component: () => import('@/views/dashboard/pages/Rtl')
      },
      {
        name: 'User Profile',
        path: 'pages/user',
        component: () => import('@/views/dashboard/pages/UserProfile')
      },
      {
        name: 'Timeline',
        path: 'pages/timeline',
        component: () => import('@/views/dashboard/pages/Timeline')
      },
      // Components
      {
        name: 'Buttons',
        path: 'components/buttons',
        component: () => import('@/views/dashboard/component/Buttons')
      },
      {
        name: 'Grid System',
        path: 'components/grid-system',
        component: () => import('@/views/dashboard/component/Grid')
      },
      {
        name: 'Tabs',
        path: 'components/tabs',
        component: () => import('@/views/dashboard/component/Tabs')
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications')
      },
      {
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons')
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography')
      },
      // Forms
      {
        name: 'Regular Forms',
        path: 'forms/regular',
        component: () => import('@/views/dashboard/forms/RegularForms')
      },
      {
        name: 'Extended Forms',
        path: 'forms/extended',
        component: () => import('@/views/dashboard/forms/ExtendedForms')
      },
      {
        name: 'Validation Forms',
        path: 'forms/validation',
        component: () => import('@/views/dashboard/forms/ValidationForms')
      },
      {
        name: 'Wizard',
        path: 'forms/wizard',
        component: () => import('@/views/dashboard/forms/Wizard')
      },
      // Tables
      {
        name: 'Regular Tables',
        path: 'tables/regular-tables',
        component: () => import('@/views/dashboard/tables/RegularTables')
      },
      {
        name: 'Extended Tables',
        path: 'tables/extended-tables',
        component: () => import('@/views/dashboard/tables/ExtendedTables')
      },
      {
        name: 'Data Tabels',
        path: 'tables/data-tables',
        component: () => import('@/views/dashboard/tables/DataTables')
      },
      // Root level
      {
        name: 'Widgets',
        path: 'widgets',
        component: () => import('@/views/dashboard/Widgets')
      },
      {
        name: 'Charts',
        path: 'charts',
        component: () => import('@/views/dashboard/Charts')
      },
      {
        name: 'Calendar',
        path: 'calendar',
        component: () => import('@/views/dashboard/Calendar')
      },

      {
        name: 'ActasList',
        path: '/actas/list/',
        component: () => import('@/views/dashboard/pages/acta/List'),
        props: true
      },
      {
        name: 'ActasCreate',
        path: '/actas/create/',
        component: () => import('@/views/dashboard/pages/acta/Create'),
        props: true
      },
      {
        name: 'ActasUpdate',
        path: '/actas/edit/:id/',
        component: () => import('@/views/dashboard/pages/acta/Update'),
        props: true
      },
      {
        name: 'DecanatosList',
        path: '/decanatos/list/',
        component: () => import('@/views/dashboard/pages/decanatos/List'),
        props: true
      },
      {
        name: 'DecanatosCreate',
        path: '/decanatos/create/',
        component: () => import('@/views/dashboard/pages/decanatos/Create'),
        props: true
      },
      {
        name: 'DecanatosUpdate',
        path: '/decanatos/edit/:id/',
        component: () => import('@/views/dashboard/pages/decanatos/Update'),
        props: true
      },
      //Profile
      {
        name: 'Profile',
        path: '/userprofile/edit',
        component: () => import('@/views/dashboard/pages/user/UserProfile')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router

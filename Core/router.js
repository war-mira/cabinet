
import Vue from 'vue';
import Router from 'vue-router';
import store from './store'

import { rejects } from 'assert';
import MainService from './services/MainService';
import Access from './pages/Access.vue'
import Auth from '../Auth/pages/_base.vue'
import Registration from '../Registration/pages/RegisterForm.vue'
import ResetPassword from '../Auth/pages/ResetPassword.vue'
import NotAllowed from './pages/NotAllowed.vue'
import AcceptOffer from '../Registration/pages/Offer.vue'
import MainPage from './pages/MainPage.vue'

Vue.use(Router);

const router = new Router({
    mode:'history',
    routes: [
        {
            path: '/login',
            name: 'Auth',
            component: Auth,
            meta: {
                permission: 'all'
            }
        },
        {
            path: '/register',
            name: 'Registration',
            component: Registration,
            meta: {
                permission: 'all'
            }
        },
        {
            path: '/password/reset',
            name: 'ResetPassword',
            component: ResetPassword,
            meta: {
                permission: 'all'
            }
        },
        {
            path: '/unverified',
            name: 'NotAllowed',
            component: NotAllowed
        },
        {
            path: '/accept-offer',
            name: 'AcceptOffer',
            component: AcceptOffer
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.meta.permission == 'all'){
        next()
    }
    store.dispatch('initUser').then((response) => {
        let roles = store.getters.getUserRoles
        let status = store.getters.getDoctorStatus
        if(to.meta.status == true){
            if(!status){
                next('/unverified')
                return
            }
        }
        if(to.meta.permission){
            switch(to.meta.permission){
                case 'doctor':
                    if(MainService.hasAccess(roles, [1])){
                        next()
                    }else{
                        next('/')
                    }
                break
                case 'medcenter':
                    if(MainService.hasAccess(roles, [2])){
                        next()
                    }else{
                        next('/')
                    }
                break
            }
        }
        next()
    }).catch((error) => {
        
    })
})

export default router;
import Vue from "vue";
import Vuex from "vuex";
import Api from "./services/Api"

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {
        userInfo: null,
        widgets: [],
        comp_modals: [],
        unverified: null,
        doctor_status: null,
        offer_status: null,
        roles: null,
        loader_status: true,
    },
    getters: {
        getUserRoles(state){
            return state.roles
        },
        getDoctorStatus(state){
            return state.doctor_status
        },
        getUserOfferStatus(state){
            return state.offer_status
        },
        getVerification(state){
            return state.unverified
        },
        getUserProfile (state) {
            return state.userInfo
        },
        getWidgets(state){
            return state.widgets
        },
        getCompModals(state){
            return state.comp_modals
        },
        getDoctorBalance(state){
            if(state.userInfo){
                return state.userInfo.wallet
            }
            return
        },
        getDoctorRoles(state){
            if(state.userInfo){
                return state.userInfo.roles
            }
            return
        },
        getUserRoles(state){
            if(state.userInfo){
                return state.userInfo.roles
            }
            return
        },
        getLoaderStatus(state){
            return state.loader_status
        },
    },
    mutations: {
        SET_USER_PROFILE(state, data){
            state.userInfo = data
        },
        SET_LIST_WIDGETS(state, {widget, props}){
            state.widgets.push({ name: widget, props: props });
        },
        SET_LIST_COMP_MODALS(state, {name, type}){
            state.comp_modals.push({name: name, type: type});
        },
        SET_USER_VERIFICATION(state, data){
            state.unverified = data
        },
        SET_DOCTOR_STATUS(state, data){
            state.doctor_status = data
        },
        SET_USER_OFFER_STATUS(state, data){
            state.offer_status = data
        },
        SET_USER_ROLES(state, data){
            state.roles = data
        },
        SET_LOADER_STATUS(state, data){
            state.loader_status = data
        },
        SET_USER_OCCUPANCY(state, data){
            state.userInfo.short_statistics.filling_percentage = data
        },
        FLUSH_LIST_WIDGETS(state){
            state.widgets = []
        },
        FLUSH_LIST_COMP_MODALS(state){
            state.comp_modals = []
        },
        FLUSH_USER_INFO(state){
            state.userInfo = null
        },
        FLUSH_USER_OCCUPANCY(state){
            state.userInfo.short_statistics.filling_percentage = null
        }
    },
    actions: {
        initUser({commit}){
            if(this.state.userInfo){
                return
            }
            return Api().get('my').then((response) => {
                let data = response.data.data
                commit('SET_USER_PROFILE', data)
                commit('SET_USER_VERIFICATION', data.unverified)
                commit('SET_USER_ROLES', data.roles)
                if(data.short_statistics){
                    commit('SET_DOCTOR_STATUS', data.short_statistics.status)
                    commit('SET_USER_OFFER_STATUS', data.states.offer_accepted)
                }
            }).catch((error) => {
                // console.log('ошибка'+error.response.data.message)
            })
        },
        setUserOccupancy({commit, dispatch}){
            return Api().get('my').then((response) => {
                let data = response.data.data
                if(data.short_statistics){
                    commit('SET_USER_OCCUPANCY', data.short_statistics.filling_percentage)
                }
            }).catch((error) => {
                
            })
        }
    },
    setLoaderStatus({commit}){
        commit('SET_LOADER_STATUS', data)
    }
});

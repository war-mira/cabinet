import Api from './Api'
import store from '../store'

export default{
  notify(type, text){
    Vue.notify({
      group: 'main',
      text: text,
      type: type
    })
  },
  showErrors(errors){
    try {
      if(errors.response.data){
          let data = errors.response.data.errors;
          let errorsCount = Object.keys(data).length
          for (let err in data) {
            if(errorsCount<2){
              Vue.notify({group: "main", text: (data[err].toString()), type: 'error'});
              return
            }
            data[err].forEach(item => {
                Vue.notify({group: "main", text: item, type: 'error'});
            })
          }
      }else{
          Vue.notify({group: "main", text: data,type: 'error'});
      }
    } catch (e) {
      Vue.notify({group: "main", text: e, type: 'error'});
    }
  },
  showSuccess(success){
    Vue.notify({group: "main", text: success, type: 'success'});
  },
  showWarning(warning){
    Vue.notify({group: "main", text: warning, type: 'warning'});
  },
  showInternalMessages(msg, type){
    Vue.notify({group: "main", text: msg, type: type});
  },
  isMobile() {
    return window.innerWidth <= 768
  },
}
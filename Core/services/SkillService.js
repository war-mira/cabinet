import Api from './Api'

export default {
    getAll(callback){
        return Api().get('/skills').then(callback);
    }
}
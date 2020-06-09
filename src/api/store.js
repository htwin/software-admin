import request from '@/utils/request'
const api_name = 'store'
export default{
  
    //所有门店列表
    storeAllList(){
        return request({
            url: `/${api_name}/storeAllList`,
            method: "get"
        })
    },
    //添加门店
    save(store){
        return request({
            url: `/${api_name}/add`,
            method: "post",
            data:store
        })
    }
    
}
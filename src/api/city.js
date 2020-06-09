import request from '@/utils/request'
const api_name = 'city'
export default{
  
    //城市全部列表
    cityAllList(){
        return request({
            url: `/${api_name}/list`,
            method: "get"
        })
    },

   
    
}
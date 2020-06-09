import request from '@/utils/request'
const api_name = 'county'
export default{
  
    //根据 城市id 获取区县 列表
    getcountyListByCityId(cityId){
        return request({
            url: `/${api_name}/getCountyListByCityId/${cityId}`,
            method: "get"
        })
    },

   
    
}
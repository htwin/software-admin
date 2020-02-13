import request from '@/utils/request'
const group_name = "college"
const api_name = 'college'
export default{
    
    //学院列表
    list(){
        return request({
            url: `/${group_name}/${api_name}/list`,
            method: "get"
        })
    }
}
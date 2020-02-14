import request from '@/utils/request'
const group_name = "admin"
const api_name = 'admin'
export default{
    login(admin){
        return request({
            url:`/${group_name}/${api_name}/login`,
            method:'post',
            data:admin
        })
    }
}
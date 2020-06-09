import request from '@/utils/request'
const api_name = 'healthCareProvider'
export default{
  
    //用户列表
    staffList(page,size){
        return request({
            url: `/${api_name}/staffList/${page}/${size}`,
            method: "get"
        })
    },

    //保存
    save(staff){
        return request({
            url: `/${api_name}/add`,
            method: "post",
            data: staff
        })
    },
    //根据id删除
    deleteById(id){
        return request({
            url: `/${api_name}/delete/${id}`,
            method: "delete"
        })
    }
    
}
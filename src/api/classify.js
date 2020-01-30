import request from '@/utils/request'
const group_name = "classify"
const api_name = "classify"
export default{

    list(){
        return request({
            url: `/${group_name}/${api_name}/list`,
            method: 'get'
        })
    },

    //保存 修改或增加
    save(classify){
        return request({
            url: `/${group_name}/${api_name}/add`,
            method: 'post',
            data: classify
        })
    },
    //根据id删除
    deleteById(id){
        return request({
            url: `/${group_name}/${api_name}/delete/${id}`,
            method: 'post',
        })
    }
    

}
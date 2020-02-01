import request from '@/utils/request'
const group_name = "tutorial"
const api_name = 'tutorial'
export default{

    //根据软件id查询教程
    findBySoftwareId(softwareId){
        return request({
            url: `/${group_name}/${api_name}/${softwareId}`,
            method: "get"
        })
    },

    //教程列表  支持模糊查询
    search(page,size,entity){
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: "post",
            data:entity
        })
    },
    //根据id删除
    deleteById(id){
        return request({
            url: `/${group_name}/${api_name}/deleteById/${id}`,
            method: 'post',
        })
    },
    //添加教程
    add(tutorial){
        return request({
            url: `/${group_name}/${api_name}/add`,
            method: 'post',
            data:tutorial
        })
    },
    //根据教程查询教程
    findById(id){
        return request({
            url:`/${group_name}/${api_name}/findById/${id}`,
            method: "get"
        })
    }


}
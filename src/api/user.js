import request from '@/utils/request'
const group_name = "user"
const api_name = 'user'
export default{
    //登录 学号 密码
    loginByAccount(entity){
        return request({
            url: `/${group_name}/${api_name}/login`,
            method: "post",
            data:entity
        })
    },
    //用户列表
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
            url: `/${group_name}/${api_name}/delete/${id}`,
            method: 'post',
        })
    },
    //保存用户信息
    save(userEntity){
        var opertion = "add";
        var method = "post";
        if(userEntity.id != undefined){
            opertion = "update"
            method = "put"
        }
        return request({
            url: `/${group_name}/${api_name}/${opertion}`,
            method: method,
            data: userEntity
        })
    }
}
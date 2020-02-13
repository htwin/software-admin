import request from '@/utils/request'
const group_name = "statistics"
const api_name = 'statistics'

export default{
    collegeNameAndDownload(){
        return request({
            url: `/${group_name}/${api_name}/college`,
            method:"get"
        })
    },
    softNameAndDownload(){
        return request({
            url: `/${group_name}/${api_name}/software`,
            method:"get"
        })
    }
}
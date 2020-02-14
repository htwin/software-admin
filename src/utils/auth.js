import Cookies from 'js-cookie'

const admin_token = 'admin_token'
const admin_name = 'admin_name'

export function getAdmin() {
  return {
    "admin_token": Cookies.get(admin_token),
    "admin_name": Cookies.get(admin_name),
  }
}

export function setAdmin(adminName, token) {
  var inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);//一个小时
  Cookies.set("admin_name", adminName, {
    expires: inFifteenMinutes
  })
  Cookies.set("admin_token", token, {
    expires: inFifteenMinutes
  })
}

export function removeAdmin() {
  Cookies.remove(admin_token)
  Cookies.remove(admin_name)
}


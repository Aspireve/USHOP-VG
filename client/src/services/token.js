export function getAccessToken() {
  return JSON.parse(localStorage.getItem("userInfo"))?.token || "";
}
export function removeToken() {
  localStorage.removeItem("userInfo");
}
export function setToken(userInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

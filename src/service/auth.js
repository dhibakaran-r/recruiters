export const isAuth = () => {
    let checkAuth;
    localStorage.getItem('auth') == 'true' ? checkAuth = true : checkAuth = false
    return checkAuth;
}
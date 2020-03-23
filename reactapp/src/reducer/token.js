const USER_TOKEN_KEY = 'userToken'

export default function(token = '', action) {
    if(action.type === 'addToken'){
        localStorage.setItem(USER_TOKEN_KEY, action.token)
        return action.token
    } else if (action.type === 'removeToken') {
        localStorage.removeItem(USER_TOKEN_KEY)
        return ''
    } else if (action.type === 'getToken') {
        const storedToken = localStorage.getItem(USER_TOKEN_KEY)
        return storedToken
    } else {
        return token
    }
}

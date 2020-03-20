const USER_ID_KEY = 'userId'

export default function (user = "", action){
// _______________ action ADD _______________
    if (action.type === 'addUserId') {
        localStorage.setItem(USER_ID_KEY, action.user)
        return action.user
    } else if (action.type === 'removeUserId') {
        localStorage.removeItem(USER_ID_KEY)
        
        return user
    } else if (action.type === 'getUserId') {
        const id = localStorage.getItem(USER_ID_KEY)
        return id    
    
    } else {
        return user
    }
}
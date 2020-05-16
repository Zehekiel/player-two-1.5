const USER_AVATAR = 'userAvatar'

export default function(avatar = '', action) {
    if(action.type === 'addavatar'){
        localStorage.setItem(USER_AVATAR, action.avatar)
        return action.avatar
    } else if (action.type === 'removeavatar') {
        localStorage.removeItem(USER_AVATAR)
        return ''
    } else if (action.type === 'getavatar') {
        const storedavatar = localStorage.getItem(USER_AVATAR)
        return storedavatar
    } else {
        return avatar
    }
}

import { SWITCH_MENU } from './../constants'

const initialState = {
    menu: '首页'
}

export default (state=initialState, action) => {
    switch(action.type){
        case SWITCH_MENU:
            return {
                ...state,
                menu: action.menu
            }
        default:
            return state
    }
}
import { SWITCH_MENU } from './../constants'

export const switch_menu = (menu) => {
    return {
        type: SWITCH_MENU,
        menu
    }
}
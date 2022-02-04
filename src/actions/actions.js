// Action Creator
export function tryToLogin(userData) {
    return {
        type: 'LOGIN',
        data: userData
    }
}

export function tryToLogout() {
    return {
        type: 'LOGOUT',
        data: 'Vero'
    }
}

export function toggleSidebar() {
    return {
        type: 'SIDEBAR_CHANGE',
        data: 'Vero'
    }
}

export function toggleSidebarItem() {
    return {
        type: 'SIDEBAR_ITEM_CHANGE',
        data: 'Vero'
    }
}

export function toggleSidebarItem2() {
    return {
        type: 'SIDEBAR_ITEM_CHANGE_2',
        data: 'Vero'
    }
}

export function toggleSidebarItem3() {
    return {
        type: 'SIDEBAR_ITEM_CHANGE_3',
        data: 'Vero'
    }
}

export function updateAccountsAction(accounts) {
    return {
        type: 'UPDATE_ACCOUNTS',
        data: accounts
    }
}

export function updateSavingsAction(savings) {
    return {
        type: 'UPDATE_SAVINGS',
        data: savings
    }
}

export function transferOneTime(transferData) {
    return {
        type: 'ONE_TIME_TRANSFER',
        data: transferData
    }
}

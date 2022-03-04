const currentTab = 'current_tab';

export function setTab(key) {
    return localStorage.setItem(currentTab, key)
}

export function getTab() {
    return localStorage.getItem(currentTab)
}

export function removeTab() {
    return localStorage.removeItem(currentTab)
}
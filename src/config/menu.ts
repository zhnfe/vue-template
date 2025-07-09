interface Menu {
    pid: number
    url: string
    title: string
    icon?: string
    children?: Menu[]
    [propName: string]: any

}

export const menus: Menu[] = [
    {
        pid: 1,
        url: 'homeDefault',
        title: '首页',
        icon: 'home'
    },
    {
        pid: 1,
        title: 'Demo',
        icon: 'command-line',
        url: 'demo',
        children: [
            {
                pid: 1,
                url: 'dynamicFormDemo',
                title: '动态表单',
                icon: 'cube-transparent'
            },
            {
                pid: 2,
                url: 'scrollComment',
                title: '滚动评论'
            }
        ]
    }
]

export const getMenuPath = (menus: Menu[], targetUrl: string) => {
    let path: Menu[] = []
    const _findPath = (menuList: Menu[], currentPath: Menu[]) => {
        for (const menu of menuList) {
            const newPath = [...currentPath, menu]
            if (menu.url === targetUrl) {
                path = newPath
                return true
            }
            if (menu.children && _findPath(menu.children, newPath)) {
                return true
            }
        }
        return false
    }
    _findPath(menus, [])
    return path
}

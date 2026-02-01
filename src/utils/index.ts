import { createDiscreteApi } from 'naive-ui'

export const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal']
)

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

/** 给一个对象添加一个不可枚举的 _id 属性, 可指定 key */
export function useInjectId(obj: AnyObject, key = '_id') {
    if (Object.hasOwn(obj, key)) {
        return obj
    }
    Object.defineProperty(obj, key, {
        enumerable: false,
        value: Symbol('id')
    })
    return obj
}

export function getRandomNumber(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

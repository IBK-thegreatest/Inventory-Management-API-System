export interface Category {
    name: string
    description: string
    isDisabled: boolean
}

export interface CategoryInfo extends Category {
    _id: any
}
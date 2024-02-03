export interface ITodo {
    id: string
    title: string
    status: boolean
}

export interface IToProps {
    filter: string | boolean
    query: string
}
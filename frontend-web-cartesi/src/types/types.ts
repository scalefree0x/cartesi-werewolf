
export type ReduxAction = {
    type: string,
    payload: any
}

export type Route = {
    path: string,
    element: () => JSX.Element
}
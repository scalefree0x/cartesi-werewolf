import { Doctor, Drunk, Peasant, Seer, WereWolf, Witch } from "../models"

export type ReduxAction = {
    type: string,
    payload: any
}

export type Route = {
    path: string,
    element: () => JSX.Element
}

export type Role = Doctor | Drunk | Peasant | Seer | WereWolf | Witch

export type Player = { public_key: string, role: Role };
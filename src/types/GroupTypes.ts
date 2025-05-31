import { GoogleUser } from "./UserTypes";

type GroupType = {
    _id: Object,
    groupName: string,
    date: Date,
    users: GoogleUser[]
}


export type {GroupType};
type GoogleUser = {
    _id: Object,
    email: string,
    __v: number,
    name: string,
    picture: string
}

type User = {
    email: string,
    name: string,
    picture: string,
    friends: Object[],
}

export type { GoogleUser, User };
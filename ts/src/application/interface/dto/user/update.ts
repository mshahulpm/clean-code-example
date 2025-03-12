export interface UpdateUserPersonalDTO {
    name: string
}

export interface UpdateUserEmailDTO {
    email: string
}

export interface UpdateUserPasswordDTO {
    old_password: string
    new_password: string
}
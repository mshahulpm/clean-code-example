export interface ITodo {
    todo_id: string,
    title: string,
    description: string,
    est_time_in_hr: number,
    scheduled_date_time: Date,
    user_id: string
    is_completed: boolean
    completed_time?: Date
}

export class Todo {

    constructor(
        private todo_id: string,
        private title: string,
        private description: string,
        private est_time_in_hr: number,
        private scheduled_date_time: Date,
        private user_id: string,
        private is_completed: boolean,
        private completed_time: Date
    ) { }


}
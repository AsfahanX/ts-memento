import { Entry } from "./entry"

export type Library<T extends Entry = Entry> = {
    create(values: object): T 
}

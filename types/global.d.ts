import { messages, entries, libraries } from "./memento"

declare global {
    const entry = entries.entry
    const message = messages.message
    const libByName = libraries.libByName
}

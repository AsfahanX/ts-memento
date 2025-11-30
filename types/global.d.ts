import { messages, entries, libraries, ui as baseUi } from "./memento"

declare global {
    const entry = entries.entry
    const message = messages.message
    const dialog = messages.dialog
    const libByName = libraries.libByName
    const ui = baseUi.ui
}

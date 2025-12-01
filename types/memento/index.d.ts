import * as entries from "./entries"
import * as libraries from "./libraries"
import * as messages from "./messages"
import * as mementoUi from "./ui"
import * as mementoSystem from "./system"

declare global {
    const entry: typeof entries.entry
    const entryDefault: typeof entries.entryDefault
    const buildDefaultEntry: typeof entries.buildDefaultEntry

    const lib: typeof libraries.lib
    const libByName: typeof libraries.libByName
    const libById: typeof libraries.libById
    
    const message: typeof messages.message
    const log: typeof messages.log
    const dialog: typeof messages.dialog
    const notification: typeof messages.notification
    
    const ui: typeof mementoUi.ui
    const _initWidget: typeof mementoUi._initWidget

    const cancel: typeof mementoSystem.cancel
    const exit: typeof mementoSystem.exit
    const system: typeof mementoSystem.system
    const guid: typeof mementoSystem.guid
    const intent: typeof mementoSystem.intent
}

export {
    entries,
    libraries,
    messages,
    mementoUi as ui,
    mementoSystem as system,
}

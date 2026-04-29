import * as entries from "./entries";
import * as libraries from "./libraries";
import * as messages from "./messages";
import * as mementoUi from "./ui";
import * as mementoSystem from "./system";

declare global {
  var entry: typeof entries.entry;
  var entryDefault: typeof entries.entryDefault;
  var buildDefaultEntry: typeof entries.buildDefaultEntry;

  var lib: typeof libraries.lib;
  var libByName: typeof libraries.libByName;
  var libById: typeof libraries.libById;

  var message: typeof messages.message;
  var log: typeof messages.log;
  var dialog: typeof messages.dialog;
  var notification: typeof messages.notification;

  var ui: typeof mementoUi.ui;
  var _initWidget: typeof mementoUi._initWidget;

  var cancel: typeof mementoSystem.cancel;
  var exit: typeof mementoSystem.exit;
  var system: typeof mementoSystem.system;
  var guid: typeof mementoSystem.guid;
  var intent: typeof mementoSystem.intent;
}

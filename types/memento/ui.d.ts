/**
 * @see https://scripts.mementodatabase.com/script_api/ui/
 */

export type IconCode = string

/**
 * The ui() method is a JavaScript API provided by Memento Database that grants access to a framework of methods and objects for creating user interfaces (UIs) within Memento widget scripts or dialog boxes in other scripts.
 * With this method, developers can create various UI elements such as text labels, buttons, images, layers, and checkboxes.
 * 
 * @example
 * ui().text('Hello, world!');
 * @description in this example, the ui() method is called to create a new UI object, which is then used to create a text label with the text “Hello, world!”.
 * 
 * @example
 * ui().layout([
 *   ui().text('This is a text label'),
 *   ui().button('Click me!'),
 *   ui().image('https://example.com/myimage.png')
 * ]);
 * @description In this example, the layout object is created by calling the layout() method on a UI object and passing in multiple UI objects as arguments. The layout object contains a text label, a button, and an image, which are grouped together within a single view.
 * 
 * @see https://scripts.mementodatabase.com/script_api/ui/#overview
 */
export function ui(): UIBuilder

interface UIBuilder {

    findByTag(tag: string): UIObject

    /**
     * The text object is used to create a text label.
     * @param text The text to be displayed in the label.
     * @example
     * ui().text('Hello');
     * @description In this example, the text() method is called on a UI object to create a new text label with the text “Hello”.
     * @see https://scripts.mementodatabase.com/script_api/ui/#text-element
     */
    text(text: string): UIText

    /**
     * The layout object is used to group multiple UI objects together within a single view.
     * 
     * By default, the layout object arranges its children vertically in a single column.
     * However, it is possible to display the children horizontally by calling the horizontal() method.
     * @param children An array of UI objects to be arranged either horizontally in a single row or vertically in a single column.
     * @example
     * ui().layout([
     *   ui().text('This is a text label'),
     *   ui().button('Click me!'), 
     *   ui().image('https://example.com/myimage.png')
     * ]);
     * @description
     * In this example, the layout object is created by calling the layout() method on a UI object and passing in an array of multiple UI objects as an argument.
     * The layout object contains a text label, a button, and an image, which are grouped together within a single view.
     * @description
     * By default, the layout object arranges its children vertically in a single column.
     * However, it is possible to display the children horizontally by calling the horizontal() method.
     * @see https://scripts.mementodatabase.com/script_api/ui/#layout-element
     */
    layout(children: UIObject[]): UILayout

    /**
     * The button object is used to create a button within the app.
     * @param title e text to be displayed on the button.
     * @example
     * ui().button('Click me!');
     * @description In this example, the button() method is called on a UI object to create a new button with the title “Click me!”.
     * @see https://scripts.mementodatabase.com/script_api/ui/#button-element
     */
    button(title: string): UIButton

    /**
     * The editor object is used to create a text editor.
     * @param text The initial text to be displayed in the editor.
     * @example
     * ui().edit('Type your text here');
     * @description In this example, the edit() method is called on a UI object to create a new text editor with the initial text “Type your text here”. 
     * @example
     * ui().layout([
     *     ui().edit('').tag('name'), 
     *     ui().button('Create').action(function() { 
     *         lib().create({ 'Name': ui().findByTag('name').text }); 
     *         return true; 
     *     })
     * ]);
     * @description
     * In this example, a layout object is created with an editor object assigned the tag name “name” and a button object with an action function that retrieves the text from the editor object using the findByTag() method and creates a new entry in the library.
     * @see https://scripts.mementodatabase.com/script_api/ui/#editor-element
     */
    edit(text?: string): UIEditor

    /**
     * The checkbox object is used to create a checkbox UI element.
     * @param title The title or label to be displayed next to the checkbox.
     * @param value The initial value of the checkbox (true for checked, false for unchecked).
     * @example
     * ui().checkbox('Enable notifications', true);
     * @description
     * In this example, the checkbox() method is called on a UI object to create a new checkbox with the title “Enable notifications” and an initial value of true (checked).
     * @see https://scripts.mementodatabase.com/script_api/ui/#checkbox-element
     */
    checkbox(title: string, value: boolean): UICheckbox

    /**
     * The choiceBox object is used to create a choice box UI element within the app.
     * @param selected The index of the item that should be selected by default.
     * @param items An array of string values representing the items in the choice box.
     * @example
     * ui().choiceBox(0, ['Option 1', 'Option 2', 'Option 3']);
     * @description
     * In this example, the choiceBox() method is called on a UI object to create a new choice box with three options and the first option selected by default.
     * @see https://scripts.mementodatabase.com/script_api/ui/#choice-box-element
     */
    choiceBox(selected: number, items: string[]): UIChoiceBox

    /**
     * The image object is used to create an image UI element.
     * @param url The URL or file path of the image to be displayed.
     * @example
     * ui().image(lib().entries()[0].field('Photo')[0]).height(200)
     * @description
     * In this example, the image() method is called on a UI object to create a new image element.
     * The URL of the image is retrieved from the ‘Photo’ field of the first entry in the library, and the height of the image is set to 200 pixels.
     * @see https://scripts.mementodatabase.com/script_api/ui/#image-element
     */
    image(url: string): UIObject

    /**
     * The pages object is used to create a series of pages within the app that display UI elements.
     * @param children An array of UI objects to be displayed on separate pages.
     * @example
     * let images = []
     * let entries = lib().entries()
     * for (var i in entries) {
     *     images.push(ui().image(entries[i].field('Photo')[0]).height(200))
     * }
     * ui().pages(images)
     * @description
     * In this example, a new pages object is created using the ui().pages() method, and an array of UI objects (images) is passed as the children parameter.
     * The images are retrieved from the ‘Photo’ field of all entries in the database and displayed on separate pages, each with a height of 200 pixels.
     * @description
     * NOTES: The ui().pages() method returns a pages object that can be used to display multiple UI elements on separate pages.
     * @see https://scripts.mementodatabase.com/script_api/ui/#pages-element
     */
    pages(children: UIObject[]): UIObject
}

interface UIBase {
    /**
     * Sets the width of the UI element in pixels.
     */
    width(width: number): this 

    /**
     * Sets the height of the UI element in pixels.
     */
    height(height: number): this

    /**
     * Sets the width of the UI element to match the parent container’s width.
     */
    width_match_parent(): this

    /**
     * Sets the height of the UI element to match the parent container’s height.
     */
    height_match_parent(): this

    /**
     * Sets the width of the UI element to wrap the content.
     */
    width_wrap_content(): this

    /**
     * Sets the height of the UI element to wrap the content.
     */
    height_wrap_content(): this


    /**
     * Sets the weight of the UI element in a layout.
     */
    weight(weight: int): this

    /**
     * Sets the tag for the UI element.
     * This tag can be used to find and manipulate the element later during events such as button clicks.
     * 
     * @example
     * ui().button('Button').width(100).height(50).tag('button1');
     * @description In this example, a button UI element is created with a width of 100 pixels, a height of 50 pixels, and the tag “button1” is set for later reference during events such as button clicks.
     */
    tag(text: string): this
}

export interface UIObject extends UIBase {

}

interface FontOption {
    /** The font size in pixels. */
    size?: number
    /** The font color as a string or hexadecimal value. */
    color?: string;
    /** The font style, such as “bold” or “italic”. */
    style?: 'bold' | 'italic'
}

interface UIText extends UIObject{
    /**
     * Font settings can be applied to text objects using the font() method.
     * @param fontOptios An object containing font settings.
     * @example
     * ui().text('Hello').font({ size: 10, color: 'red', style: 'bold' });
     * @description
     * In this example, a text object is created with the text “Hello” and the font settings are set to a size of 10 pixels, red color, and bold style.
     * @see https://scripts.mementodatabase.com/script_api/ui/#font-settings
     */
    font(fontOptios: FontOption): this
}

interface UILayout extends UIObject{
    /**
     * By default, the layout object arranges its children vertically in a single column.
     * However, it is possible to display the children horizontally by calling the horizontal() method.
     */
    horizontal(): this
}

interface UIButton extends UIText {
    /**
     * The action() method can be used to set a callback function for the button.
     * This function will be called when the button is clicked.
     * 
     * If you want to refresh the libraries list or widgets UI after the button’s action, you can simply return true in the action function.
     * 
     * @example ui().button('Click me!').action(function() { message('Hello'); });
     * @description In this example, a button object is created with the title “Click me!” and a callback function is set to display a message when the button is clicked.
     * @example
     * ui().button('Add Entry').action(function() { lib().create({ 'Title': 'New record' }); return true; });
     * @description In this example, a new entry will be created in the library when the button is clicked, and the libraries list or widgets UI will be refreshed.
     * @see https://scripts.mementodatabase.com/script_api/ui/#action
     */
    action(callback: () => boolean | void): this

    /**
     * The icon() method can be used to set an icon for the button.
     * If no title is set for the button, a small button with an icon will be displayed.
     * @example
     * ui().button().icon('nova:add-circle-1.png');
     * @description In this example, a small button with the “add” icon will be displayed.
     * @see https://scripts.mementodatabase.com/script_api/ui/#icon
     */
    icon(icon: IconCode): this
}

/**
 * @example
 * var myEditor = ui().edit('Type your text here'); 
 * var currentText = myEditor.text; 
 * myEditor.text = 'New text';
 * @description
 * In this example, a new editor object is created with the initial text “Type your text here”.
 * The current text in the editor is then retrieved and stored in the currentText variable using the text property.
 * Finally, the text in the editor is changed to “New text” using the text property.
 * @see https://scripts.mementodatabase.com/script_api/ui/#properties
 */
interface UIEditor extends UIObject{
    text: string
}

/**
 * @see https://scripts.mementodatabase.com/script_api/ui/#checkbox-element
 */
interface UICheckbox extends UIObject{
    checked: boolean

    /**
     * The onChange() method can be used to add a change listener to the checkbox object.
     * This listener will be called whenever the value of the checkbox is changed by the user.
     * @param listener 
     * @example
     * ui().layout([
     *     ui().checkbox('Enable notifications', true).onChange(function(value) { 
     *         if (value) { 
     *             message('Notifications enabled'); 
     *         } else { 
     *             message('Notifications disabled'); 
     *         } 
     *     })
     * ]);
     * @description
     * In this example, a layout object is created with a checkbox object that has the title “Enable notifications” and an initial value of true (checked).
     * The onChange() method is then called to add a change listener to the checkbox object that displays a message depending on the new value of the checkbox.
     * @see https://scripts.mementodatabase.com/script_api/ui/#onchange
     */
    onChange(listener: Function): this
}

/**
 * The choiceBox object is used to create a choice box UI element within the app.
 * @see https://scripts.mementodatabase.com/script_api/ui/#choice-box-element
 */
interface UIChoiceBox extends UIObject {
    /** The index of the selected item. */
    selected: number

    /**
     * The onChange() method can be used to add a change listener to the choiceBox object.
     * This listener will be called whenever the selected item is changed by the user.
     * @param listener 
     * @example
     * ui().layout([
     *     ui().choiceBox(0, ['Option 1', 'Option 2', 'Option 3']).onChange(function(position) { 
     *         message('Selected option: ' + position); 
     *     })
     * ]);
     * @description
     * In this example, a layout object is created with a choiceBox object that has three options and the first option selected by default.
     * The onChange() method is then called to add a change listener to the choiceBox object that displays a message showing the index of the new selected item.
     * @see https://scripts.mementodatabase.com/script_api/ui/#onchange-1
     */
    onChange(listener: Function): this
}

/**
 * Memento can run widget scripts to display their results after various events such as displaying, refreshing libraries, or syncing libraries with the cloud.
 * However, if you want to run a part of the script only once (e.g. to initialize variables), you can use the _initWidget variable to run code only one time.
 * 
 * The _initWidget global variable is a boolean variable that is available for use in script widgets.
 * When the script runs for the first time, the value of _initWidget is true.
 * On subsequent runs of the script, _initWidget will be false.
 * @example
 * if (_initWidget) {
 *     // code to run only once
 * }
 * @example
 * var counter;
 * if (_initWidget) {
 *     counter = 0;
 * }
 * counter++;
 * @description
 * In this example, a variable counter is initialized only when the widget is first loaded.
 * Subsequent loads of the widget will skip the initialization step and increment the existing counter value.
 * @description
 * The _initWidget variable is automatically set to true when the widget is first loaded, and false for all subsequent loads.
 * @description
 * Use this variable to initialize variables or perform other one-time actions when the widget is first loaded, without triggering them during subsequent loads.
 * @description
 * By using the _initWidget variable in your script, you can ensure that your script is only executed when it needs to be, and avoid unnecessary processing and delays in loading your dashboard.
 * @see https://scripts.mementodatabase.com/scripts/widgets/#script-initialization
 * @see https://scripts.mementodatabase.com/script_api/ui/#init-script-execution
 */
export var _initWidget: boolean

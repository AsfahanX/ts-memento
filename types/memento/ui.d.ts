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

    /**
     * The text object is used to create a text label.
     * @param text The text to be displayed in the label.
     * @example
     * ui().text('Hello');
     * @description In this example, the text() method is called on a UI object to create a new text label with the text “Hello”.
     * @see https://scripts.mementodatabase.com/script_api/ui/#text-element
     */
    text(text: string): UIObject & UIText

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
    layout(children: UIObject[]): UIObject & UILayout

    /**
     * The button object is used to create a button within the app.
     * @param title e text to be displayed on the button.
     * @example
     * ui().button('Click me!');
     * @description In this example, the button() method is called on a UI object to create a new button with the title “Click me!”.
     * @see https://scripts.mementodatabase.com/script_api/ui/#button-element
     */
    button(title: string): UIObject & UIButton
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

interface UIText {
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

interface UILayout {
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

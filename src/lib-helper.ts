import type { Entry, Library } from "./types/memento";

type Handler<T> = (e: Entry<T>, ...rest: any) => void;
type Handlers<T> = {
    [name: string]: Handler<T>
}

export default abstract class LibHelper<T> {
    abstract id: string;
    // name?: string;
    private _lib: Library<T> | null = null

    // constructor(protected readonly id: string) { }

    get lib() {
        if (!this._lib) {
            this._lib = libById(this.id);
            if (!this._lib) {
                throw new Error(`Library with id ${this.id} not found`);
            }
        }
        return this._lib;
    }

    events?: {
        entry?: {
            created?: Handler<T>
            updated?: Handler<T>
            deleted?: Handler<T>
        }
    }

    actions?: {
        entry?: Handlers<T>,
        library?: Handlers<T>,
        bulk?: Handlers<T>,
    }


    // lib(): Library<T> {
    //     if (!this._lib) {
    //         this._lib = libById<T>(this.id);
    //         if (!this._lib) {
    //             throw new Error(`Library with id ${this.id} not found`);
    //         }
    //     }
    //     return this._lib;
    // }
}

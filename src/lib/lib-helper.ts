import type { Entry, Library } from "@/types/memento";

type Handler<T> = (e: Entry<T>, ...rest: any) => void;
type Handlers<T> = {
  [name: string]: Handler<T>;
};

type LibHelperEvent<T> = {
  entry?: {
    created?: Handler<T>;
    updated?: Handler<T>;
    deleted?: Handler<T>;
  };
};

type LibHelperActions<T> = {
  entry?: Handlers<T>;
  library?: Handlers<T>;
};

export abstract class LibHelperNew<T> {
  #lib: Library<T> | null = null;

  protected abstract id: string;
  //   protected abstract name: string;

  public events?: LibHelperEvent<T>;
  public actions?: LibHelperActions<T>;

  get lib() {
    return (
      this.#lib ??
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  }

  //   /**
  //    *
  //    */
  //   constructor(
  //     public events?: LibHelperEvent<T>,
  //     public actions?: LibHelperActions<T>,
  //   ) {}
}

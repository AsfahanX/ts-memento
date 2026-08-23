import type { Entry, Library } from "@/types/memento";

type Handler<T> = (e: Entry<T>, ...rest: any) => void;
type Handlers<T> = {
  [name: string]: Handler<T>;
};
export type LibHelper<T> = {
  name?: string;
  id: string;
  _lib?: Library<T>;

  lib(): Library<T>;

  events?: {
    entry?: {
      created?: Handler<T>;
      updated?: Handler<T>;
      deleted?: Handler<T>;
    };
  };

  actions?: {
    entry?: Handlers<T>;
    library?: Handlers<T>;
    bulk?: Handlers<T>;
  };

  [key: string]: any;
};

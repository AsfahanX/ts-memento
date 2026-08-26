import type { Entry, Library } from "@/types/memento";

type LibAccessor<T> = {
  get lib(): Library<T>;
};
export const createLibAccessor = <T>(id: string): LibAccessor<T> => {
  let _lib: Library<T>;
  return {
    get lib() {
      _lib ??=
        libById(id) ??
        (() => {
          throw new Error(`Library with id ${id} not found`);
        })();
      return _lib;
    },
  };
};

export const createLibhelper = <T extends LibAccessor<any>, S extends object>(
  accessor: T,
  state?: S,
): T & S => {
  return Object.assign({}, accessor, state);
};

export type libEvents<T> = {
  // events?: {
  entryCreated?: Handler<T>;
  // entryUpdated?: Handler<T>;
  entryUpdated(e?: Entry<T>, ...rest: any): void;
  entryDeleted?: Handler<T>;
  // };
};

type Handler<T> = (e?: Entry<T>, ...rest: any) => void;
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

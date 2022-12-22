export interface Repository<T> {
    load: () => Promise<T[]>;
    // como alternativa, load puede denominarse search
    queryId: (id: string) => Promise<T>;
    // No se incluye una query potencialmente más genérica query: ({ id }: { id: string }) => Promise<T>;
    create: (payload: Partial<T>) => Promise<T>;
    update: (payload: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<string>;
}

// Se puede usar type, interface o class
export type NoteNoId = {
    title: string;
    author: string;
    isImportant: boolean;
};

export type NoteStructure = {
    id: string;
    title: string;
    author: string;
    isImportant: boolean;
};

export class Note implements NoteStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isImportant: boolean;
    constructor(public title: string, public author: string) {
        this.id = Note.generateId();
        this.isImportant = false;
    }
}

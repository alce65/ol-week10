// Se puede usar type, interface o class

export type TaskStructure = {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
};

export class Task implements TaskStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isCompleted: boolean;
    constructor(public title: string, public responsible: string) {
        this.id = Task.generateId();
        this.isCompleted = false;
    }
}

// Se puede usar type, interface o class

export type PlaceStructure = {
    id: string;
    name: string;
    country: string;
    isVisited: boolean;
};

export class Place implements PlaceStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isVisited: boolean;
    constructor(public name: string, public country: string) {
        this.id = Place.generateId();
        this.isVisited = false;
    }
}

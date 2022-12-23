import { NoteStructure } from '../../models/note';
import { Repository } from '../../../../core/services/repository/repo';

const invalidIdError = new Error('Invalid ID');

export class NotesRepo implements Repository<NoteStructure> {
    constructor(private url = 'http://localhost:3300/notes/') {
        //
    }

    async load(): Promise<NoteStructure[]> {
        const resp = await fetch(this.url);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async queryId(id: string): Promise<NoteStructure> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }

    async create(payload: Partial<NoteStructure>): Promise<NoteStructure> {
        const resp = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async update(payload: Partial<NoteStructure>): Promise<NoteStructure> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async delete(id: NoteStructure['id']): Promise<NoteStructure['id']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}

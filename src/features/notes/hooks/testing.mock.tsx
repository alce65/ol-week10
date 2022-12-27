import { Note } from '../models/note';
import { NotesRepo } from '../services/repository/notes.repo';
export const mockNote1 = new Note('Test note 1', 'user');
mockNote1.id = '000001';
export const mockNote2 = new Note('Test note 2', 'user');
mockNote2.id = '000002';
export const mockNotes = [mockNote1, mockNote2];
export const mockAddNote = new Note('Added note', 'user');
mockAddNote.id = '000003';
export const mockUpdateNote = { ...mockNote2, title: 'Update note' };

export const mockValidRepoResponse = () => {
    (NotesRepo.prototype.load as jest.Mock).mockResolvedValue(mockNotes);
    (NotesRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddNote);
    (NotesRepo.prototype.update as jest.Mock).mockResolvedValue(mockUpdateNote);
    (NotesRepo.prototype.delete as jest.Mock).mockResolvedValue(mockNote1.id);
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (NotesRepo.prototype.load as jest.Mock).mockRejectedValue(error);
    (NotesRepo.prototype.create as jest.Mock).mockRejectedValue(error);
    (NotesRepo.prototype.update as jest.Mock).mockRejectedValue(error);
    (NotesRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
};

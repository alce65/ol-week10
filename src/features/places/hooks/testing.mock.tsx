import { Place } from '../models/place';
import { PlacesRepo } from '../services/repository/places.repo';
export const mockPlace1 = new Place('Test place 1', 'country');
mockPlace1.id = '000001';
export const mockPlace2 = new Place('Test place 2', 'country');
mockPlace2.id = '000002';
export const mockPlaces = [mockPlace1, mockPlace2];
export const mockAddPlace = new Place('Added place', 'country');
mockAddPlace.id = '000003';
export const mockUpdatePlace = { ...mockPlace2, title: 'Update place' };

export const mockValidRepoResponse = () => {
    (PlacesRepo.prototype.load as jest.Mock).mockResolvedValue(mockPlaces);
    (PlacesRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddPlace);
    (PlacesRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdatePlace
    );
    (PlacesRepo.prototype.delete as jest.Mock).mockResolvedValue(mockPlace1.id);
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (PlacesRepo.prototype.load as jest.Mock).mockRejectedValue(error);
    (PlacesRepo.prototype.create as jest.Mock).mockRejectedValue(error);
    (PlacesRepo.prototype.update as jest.Mock).mockRejectedValue(error);
    (PlacesRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
};

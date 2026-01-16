// Simple in-memory store for locations
// In a real app, this would be replaced with API calls or proper state management

import type { Location } from './LocationForm';

let locations: Location[] = [
  { id: 'loc1', name: 'LA Warehouse', type: 'Warehouse', country: 'US', status: 'Active' },
  { id: 'loc2', name: 'Shenzhen Hub', type: 'Warehouse', country: 'CN', status: 'Active' },
  { id: 'loc3', name: 'Rotterdam', type: 'Port', country: 'NL', status: 'Draft' },
];

export const locationStore = {
  getAll(): Location[] {
    return [...locations];
  },

  getById(id: string): Location | undefined {
    return locations.find((loc) => loc.id === id);
  },

  create(locationData: Omit<Location, 'id'>): Location {
    const newLocation: Location = {
      ...locationData,
      id: `loc${Date.now()}`,
    };
    locations.push(newLocation);
    return newLocation;
  },

  update(id: string, locationData: Omit<Location, 'id'>): Location | undefined {
    const index = locations.findIndex((loc) => loc.id === id);
    if (index === -1) return undefined;
    
    locations[index] = { ...locationData, id };
    return locations[index];
  },

  delete(id: string): boolean {
    const index = locations.findIndex((loc) => loc.id === id);
    if (index === -1) return false;
    
    locations.splice(index, 1);
    return true;
  },
};

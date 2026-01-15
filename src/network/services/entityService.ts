// Entity Service - In-memory storage for prototype
// In production, this would interface with a backend API

import type {
  Organization,
  Person,
  Facility,
  TradeLanePreference,
  PhysicalLocation,
  Port,
  Invitation,
} from '../types';

// In-memory storage
let organizations: Organization[] = [];
let people: Person[] = [];
let facilities: Facility[] = [];
let tradeLanes: TradeLanePreference[] = [];
let physicalLocations: PhysicalLocation[] = [];
let ports: Port[] = [];
let invitations: Invitation[] = [];

// Initialize with seed data
function initializeSeedData() {
  const now = new Date().toISOString();

  organizations = [
    {
      id: 'org_001',
      name: 'Shenzhen Textiles Co.',
      domain: 'shenzhentextiles.com',
      address: {
        id: 'loc_org_001',
        addressLine1: '456 Industrial Ave',
        city: 'Shenzhen',
        state: 'Guangdong',
        postalCode: '518000',
        country: 'CN',
        normalizedAddress: '456 Industrial Ave, Shenzhen, Guangdong, 518000, CN',
      },
      relationshipType: 'supplier',
      tags: ['preferred'],
      matchStatus: 'matched',
      verificationStatus: 'verified',
      connectionStatus: 'connected',
      matchedGlobalEntityId: 'global_org_001',
      matchedGlobalEntityHasAccount: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'org_002',
      name: 'Saigon Footwear Ltd',
      domain: 'saigonfootwear.vn',
      address: {
        id: 'loc_org_002',
        addressLine1: '123 Factory St',
        city: 'Ho Chi Minh City',
        country: 'VN',
        normalizedAddress: '123 Factory St, Ho Chi Minh City, VN',
      },
      relationshipType: 'supplier',
      tags: [],
      matchStatus: 'matched',
      verificationStatus: 'verified',
      connectionStatus: 'pending_invite',
      matchedGlobalEntityId: 'global_org_002',
      matchedGlobalEntityHasAccount: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'org_003',
      name: 'Monterrey Components',
      domain: 'monterreycomp.com',
      address: {
        id: 'loc_org_003',
        addressLine1: '789 Manufacturing Blvd',
        city: 'Monterrey',
        state: 'Nuevo León',
        postalCode: '64000',
        country: 'MX',
        normalizedAddress: '789 Manufacturing Blvd, Monterrey, Nuevo León, 64000, MX',
      },
      relationshipType: 'supplier',
      tags: [],
      matchStatus: 'unlinked',
      verificationStatus: 'unverified',
      connectionStatus: 'not_connected',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'org_004',
      name: 'Maersk Line',
      domain: 'maersk.com',
      address: {
        id: 'loc_org_004',
        addressLine1: 'Esplanaden 50',
        city: 'Copenhagen',
        country: 'DK',
        normalizedAddress: 'Esplanaden 50, Copenhagen, DK',
      },
      relationshipType: 'carrier',
      tags: ['preferred', 'approved'],
      matchStatus: 'matched',
      verificationStatus: 'verified',
      connectionStatus: 'connected',
      matchedGlobalEntityId: 'global_org_004',
      matchedGlobalEntityHasAccount: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'org_005',
      name: 'CMA CGM',
      domain: 'cmacgm.com',
      address: {
        id: 'loc_org_005',
        addressLine1: '4 Quai d\'Arenc',
        city: 'Marseille',
        country: 'FR',
        normalizedAddress: '4 Quai d\'Arenc, Marseille, FR',
      },
      relationshipType: 'carrier',
      tags: ['approved'],
      matchStatus: 'matched',
      verificationStatus: 'verified',
      connectionStatus: 'connected',
      matchedGlobalEntityId: 'global_org_005',
      matchedGlobalEntityHasAccount: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  // Helper function to create a person
  const createPerson = (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    organizationId: string,
    title?: string,
    phone?: string
  ): Person => ({
    id,
    firstName,
    lastName,
    email,
    phone,
    organizationId,
    title,
    matchStatus: 'matched' as const,
    verificationStatus: 'verified' as const,
    createdAt: now,
    updatedAt: now,
  });

  people = [
    // org_001: Shenzhen Textiles Co. - 15 contacts
    createPerson('person_001', 'John', 'Doe', 'john.doe@shenzhentextiles.com', 'org_001', 'Logistics Manager', '+86 138 0013 8000'),
    createPerson('person_002', 'Wei', 'Zhang', 'wei.zhang@shenzhentextiles.com', 'org_001', 'Operations Director'),
    createPerson('person_003', 'Li', 'Wang', 'li.wang@shenzhentextiles.com', 'org_001', 'Quality Manager'),
    createPerson('person_004', 'Ming', 'Chen', 'ming.chen@shenzhentextiles.com', 'org_001', 'Sales Manager'),
    createPerson('person_005', 'Yan', 'Liu', 'yan.liu@shenzhentextiles.com', 'org_001', 'Procurement Specialist'),
    createPerson('person_006', 'Hui', 'Zhou', 'hui.zhou@shenzhentextiles.com', 'org_001', 'Account Manager'),
    createPerson('person_007', 'Fang', 'Wu', 'fang.wu@shenzhentextiles.com', 'org_001', 'Shipping Coordinator'),
    createPerson('person_008', 'Xin', 'Xu', 'xin.xu@shenzhentextiles.com', 'org_001', 'Warehouse Supervisor'),
    createPerson('person_009', 'Jie', 'Sun', 'jie.sun@shenzhentextiles.com', 'org_001', 'Production Manager'),
    createPerson('person_010', 'Qing', 'Ma', 'qing.ma@shenzhentextiles.com', 'org_001', 'Finance Manager'),
    createPerson('person_011', 'Yong', 'Zhao', 'yong.zhao@shenzhentextiles.com', 'org_001', 'IT Support'),
    createPerson('person_012', 'Lei', 'Yang', 'lei.yang@shenzhentextiles.com', 'org_001', 'HR Manager'),
    createPerson('person_013', 'Tao', 'Huang', 'tao.huang@shenzhentextiles.com', 'org_001', 'Compliance Officer'),
    createPerson('person_014', 'Jun', 'Zhu', 'jun.zhu@shenzhentextiles.com', 'org_001', 'Customer Service'),
    createPerson('person_015', 'Bin', 'Gao', 'bin.gao@shenzhentextiles.com', 'org_001', 'Export Coordinator'),

    // org_002: Saigon Footwear Ltd - 8 contacts
    createPerson('person_016', 'Nguyen', 'Van An', 'nguyen.vanan@saigonfootwear.vn', 'org_002', 'General Manager'),
    createPerson('person_017', 'Tran', 'Thi Binh', 'tran.thibinh@saigonfootwear.vn', 'org_002', 'Production Manager'),
    createPerson('person_018', 'Le', 'Minh Duc', 'le.minhduc@saigonfootwear.vn', 'org_002', 'Quality Control'),
    createPerson('person_019', 'Pham', 'Thi Lan', 'pham.thilan@saigonfootwear.vn', 'org_002', 'Sales Representative'),
    createPerson('person_020', 'Hoang', 'Van Cuong', 'hoang.vancuong@saigonfootwear.vn', 'org_002', 'Logistics Coordinator'),
    createPerson('person_021', 'Vu', 'Thi Mai', 'vu.thimai@saigonfootwear.vn', 'org_002', 'Accountant'),
    createPerson('person_022', 'Do', 'Van Hung', 'do.vanhung@saigonfootwear.vn', 'org_002', 'Warehouse Manager'),
    createPerson('person_023', 'Bui', 'Thi Hoa', 'bui.thihoa@saigonfootwear.vn', 'org_002', 'Customer Relations'),

    // org_003: Monterrey Components - 3 contacts
    createPerson('person_024', 'Carlos', 'Rodriguez', 'carlos.rodriguez@monterreycomp.com', 'org_003', 'Operations Manager'),
    createPerson('person_025', 'Maria', 'Gonzalez', 'maria.gonzalez@monterreycomp.com', 'org_003', 'Sales Director'),
    createPerson('person_026', 'Jose', 'Martinez', 'jose.martinez@monterreycomp.com', 'org_003', 'Supply Chain Manager'),

    // org_004: Maersk Line - 20 contacts
    createPerson('person_027', 'Anders', 'Hansen', 'anders.hansen@maersk.com', 'org_004', 'Regional Director'),
    createPerson('person_028', 'Emma', 'Nielsen', 'emma.nielsen@maersk.com', 'org_004', 'Operations Manager'),
    createPerson('person_029', 'Lars', 'Jensen', 'lars.jensen@maersk.com', 'org_004', 'Fleet Manager'),
    createPerson('person_030', 'Sofia', 'Andersen', 'sofia.andersen@maersk.com', 'org_004', 'Customer Success Manager'),
    createPerson('person_031', 'Mikkel', 'Pedersen', 'mikkel.pedersen@maersk.com', 'org_004', 'Port Operations'),
    createPerson('person_032', 'Ida', 'Christensen', 'ida.christensen@maersk.com', 'org_004', 'Logistics Coordinator'),
    createPerson('person_033', 'Thomas', 'Larsen', 'thomas.larsen@maersk.com', 'org_004', 'Vessel Manager'),
    createPerson('person_034', 'Anna', 'Rasmussen', 'anna.rasmussen@maersk.com', 'org_004', 'Sales Executive'),
    createPerson('person_035', 'Jonas', 'Madsen', 'jonas.madsen@maersk.com', 'org_004', 'Route Planner'),
    createPerson('person_036', 'Laura', 'Olsen', 'laura.olsen@maersk.com', 'org_004', 'Documentation Specialist'),
    createPerson('person_037', 'Mathias', 'Thomsen', 'mathias.thomsen@maersk.com', 'org_004', 'IT Manager'),
    createPerson('person_038', 'Camilla', 'Holm', 'camilla.holm@maersk.com', 'org_004', 'Finance Director'),
    createPerson('person_039', 'Sebastian', 'Moller', 'sebastian.moller@maersk.com', 'org_004', 'Compliance Officer'),
    createPerson('person_040', 'Nina', 'Sorensen', 'nina.sorensen@maersk.com', 'org_004', 'Customer Service Manager'),
    createPerson('person_041', 'Christian', 'Berg', 'christian.berg@maersk.com', 'org_004', 'Procurement Manager'),
    createPerson('person_042', 'Mette', 'Dahl', 'mette.dahl@maersk.com', 'org_004', 'HR Manager'),
    createPerson('person_043', 'Rasmus', 'Kjaer', 'rasmus.kjaer@maersk.com', 'org_004', 'Business Development'),
    createPerson('person_044', 'Julie', 'Bech', 'julie.bech@maersk.com', 'org_004', 'Marketing Manager'),
    createPerson('person_045', 'Martin', 'Frandsen', 'martin.frandsen@maersk.com', 'org_004', 'Safety Officer'),
    createPerson('person_046', 'Line', 'Hjort', 'line.hjort@maersk.com', 'org_004', 'Quality Assurance'),

    // org_005: CMA CGM - 12 contacts
    createPerson('person_047', 'Jean', 'Dubois', 'jean.dubois@cmacgm.com', 'org_005', 'Regional Manager'),
    createPerson('person_048', 'Marie', 'Martin', 'marie.martin@cmacgm.com', 'org_005', 'Operations Director'),
    createPerson('person_049', 'Pierre', 'Bernard', 'pierre.bernard@cmacgm.com', 'org_005', 'Fleet Operations'),
    createPerson('person_050', 'Sophie', 'Lefebvre', 'sophie.lefebvre@cmacgm.com', 'org_005', 'Customer Relations'),
    createPerson('person_051', 'Antoine', 'Moreau', 'antoine.moreau@cmacgm.com', 'org_005', 'Port Manager'),
    createPerson('person_052', 'Isabelle', 'Garcia', 'isabelle.garcia@cmacgm.com', 'org_005', 'Logistics Coordinator'),
    createPerson('person_053', 'Francois', 'Roux', 'francois.roux@cmacgm.com', 'org_005', 'Sales Manager'),
    createPerson('person_054', 'Celine', 'Simon', 'celine.simon@cmacgm.com', 'org_005', 'Documentation Manager'),
    createPerson('person_055', 'Nicolas', 'Laurent', 'nicolas.laurent@cmacgm.com', 'org_005', 'IT Director'),
    createPerson('person_056', 'Amelie', 'Petit', 'amelie.petit@cmacgm.com', 'org_005', 'Finance Manager'),
    createPerson('person_057', 'Julien', 'Robert', 'julien.robert@cmacgm.com', 'org_005', 'Compliance Manager'),
    createPerson('person_058', 'Claire', 'Durand', 'claire.durand@cmacgm.com', 'org_005', 'Customer Service Lead'),
  ];

  facilities = [
    {
      id: 'facility_001',
      name: 'LA Warehouse',
      type: 'warehouse',
      organizationId: 'org_001',
      ownershipType: 'owned',
      matchStatus: 'matched',
      verificationStatus: 'verified',
      createdAt: now,
      updatedAt: now,
    },
  ];
}

// Initialize on module load
initializeSeedData();

// Organization CRUD
export const organizationService = {
  async getAll(): Promise<Organization[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...organizations];
  },

  async getById(id: string): Promise<Organization | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return organizations.find(o => o.id === id) || null;
  },

  async create(org: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Promise<Organization> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newOrg: Organization = {
      ...org,
      id: `org_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    organizations.push(newOrg);
    return newOrg;
  },

  async update(id: string, updates: Partial<Organization>): Promise<Organization> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = organizations.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Organization not found');
    organizations[index] = {
      ...organizations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return organizations[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    organizations = organizations.filter(o => o.id !== id);
  },

  async bulkUpdate(ids: string[], updates: Partial<Organization>): Promise<Organization[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return ids.map(id => {
      const index = organizations.findIndex(o => o.id === id);
      if (index !== -1) {
        organizations[index] = {
          ...organizations[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        return organizations[index];
      }
      return null as any;
    }).filter(Boolean);
  },
};

// Person CRUD
export const personService = {
  async getAll(): Promise<Person[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...people];
  },

  async getById(id: string): Promise<Person | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return people.find(p => p.id === id) || null;
  },

  async create(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newPerson: Person = {
      ...person,
      id: `person_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    people.push(newPerson);
    return newPerson;
  },

  async update(id: string, updates: Partial<Person>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = people.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Person not found');
    people[index] = {
      ...people[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return people[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    people = people.filter(p => p.id !== id);
  },
};

// Facility CRUD
export const facilityService = {
  async getAll(): Promise<Facility[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...facilities];
  },

  async getById(id: string): Promise<Facility | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return facilities.find(f => f.id === id) || null;
  },

  async create(facility: Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>): Promise<Facility> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newFacility: Facility = {
      ...facility,
      id: `facility_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    facilities.push(newFacility);
    return newFacility;
  },

  async update(id: string, updates: Partial<Facility>): Promise<Facility> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = facilities.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Facility not found');
    facilities[index] = {
      ...facilities[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return facilities[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    facilities = facilities.filter(f => f.id !== id);
  },
};

// Trade Lane CRUD
export const tradeLaneService = {
  async getAll(): Promise<TradeLanePreference[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...tradeLanes];
  },

  async getById(id: string): Promise<TradeLanePreference | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return tradeLanes.find(t => t.id === id) || null;
  },

  async create(lane: Omit<TradeLanePreference, 'id' | 'createdAt' | 'updatedAt'>): Promise<TradeLanePreference> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newLane: TradeLanePreference = {
      ...lane,
      id: `lane_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tradeLanes.push(newLane);
    return newLane;
  },

  async update(id: string, updates: Partial<TradeLanePreference>): Promise<TradeLanePreference> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = tradeLanes.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Trade lane not found');
    tradeLanes[index] = {
      ...tradeLanes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return tradeLanes[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    tradeLanes = tradeLanes.filter(t => t.id !== id);
  },
};

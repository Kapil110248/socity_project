import api from '../lib/api';

export const residentService = {
    getDashboardData: async () => {
        const response = await api.get('/resident/dashboard');
        return response.data;
    },

    // My Unit
    getUnitData: async () => {
        const response = await api.get('/resident/unit');
        return response.data;
    },
    addFamilyMember: async (data: any) => {
        const response = await api.post('/resident/unit/family', data);
        return response.data;
    },
    updateFamilyMember: async (id: number | string, data: any) => {
        const response = await api.put(`/resident/unit/family/${id}`, data);
        return response.data;
    },
    addVehicle: async (data: any) => {
        const response = await api.post('/resident/unit/vehicle', data);
        return response.data;
    },
    updateVehicle: async (id: number | string, data: any) => {
        const response = await api.put(`/resident/unit/vehicle/${id}`, data);
        return response.data;
    },
    addPet: async (data: any) => {
        const response = await api.post('/resident/unit/pet', data);
        return response.data;
    },
    updatePet: async (id: number | string, data: any) => {
        const response = await api.put(`/resident/unit/pet/${id}`, data);
        return response.data;
    },

    // SOS
    getSOSData: async () => {
        const response = await api.get('/resident/sos/data');
        return response.data;
    },
    triggerSOS: async (data: any) => {
        const response = await api.post('/resident/sos/trigger', data);
        return response.data;
    },
    addEmergencyContact: async (data: any) => {
        const response = await api.post('/resident/sos/contact', data);
        return response.data;
    },

    // Helpdesk
    getTickets: async () => {
        const response = await api.get('/resident/tickets');
        return response.data;
    },
    createTicket: async (data: any) => {
        const response = await api.post('/resident/tickets', data);
        return response.data;
    },

    // Marketplace
    getMarketItems: async () => {
        const response = await api.get('/resident/market/items');
        return response.data;
    },
    createMarketItem: async (data: any) => {
        const response = await api.post('/resident/market/items', data);
        return response.data;
    },

    // Services
    getServices: async () => {
        const response = await api.get('/resident/services');
        return response.data;
    },
    createServiceInquiry: async (data: any) => {
        const response = await api.post('/resident/services/inquiry', data);
        return response.data;
    },

    // Amenities
    getAmenities: async () => {
        const response = await api.get('/resident/amenities');
        return response.data;
    },
    bookAmenity: async (data: any) => {
        const response = await api.post('/resident/amenities/book', data);
        return response.data;
    },

    // Community
    getCommunityFeed: async () => {
        const response = await api.get('/resident/community/feed');
        return response.data;
    },
    createPost: async (data: any) => {
        const response = await api.post('/resident/community/post', data);
        return response.data;
    },
    createComment: async (data: any) => {
        const response = await api.post('/resident/community/comment', data);
        return response.data;
    },

    // Guidelines
    getGuidelines: async () => {
        const response = await api.get('/resident/guidelines');
        return response.data;
    },
};

import api from '../lib/api';
import { API_CONFIG } from '../config/api.config';

export const SocietyService = {
    getAllList: async () => {
        const response = await api.get(API_CONFIG.SOCIETY.ALL);
        return response.data;
    },
    list: async () => {
        const response = await api.get(API_CONFIG.SOCIETY.LIST);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post(API_CONFIG.SOCIETY.CREATE, data);
        return response.data;
    },
    update: async (id: number | string, data: any) => {
        const response = await api.put(API_CONFIG.SOCIETY.UPDATE(id), data);
        return response.data;
    },
    delete: async (id: number | string) => {
        const response = await api.delete(API_CONFIG.SOCIETY.DELETE(id));
        return response.data;
    },
    getById: async (id: number | string) => {
        const response = await api.get(API_CONFIG.SOCIETY.GET(id));
        return response.data;
    }
};

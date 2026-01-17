import api from '../lib/api';
import { API_CONFIG } from '../config/api.config';

export const BillingService = {
    listInvoices: async () => {
        const response = await api.get(API_CONFIG.BILLING.INVOICES);
        return response.data;
    },
    generateInvoices: async () => {
        const response = await api.post(API_CONFIG.BILLING.GENERATE);
        return response.data;
    },
    getStats: async () => {
        const response = await api.get(API_CONFIG.BILLING.STATS);
        return response.data;
    }
};

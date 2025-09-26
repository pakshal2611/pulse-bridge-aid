import axios from 'axios';

// Base URL for FastAPI backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
export const mockData = {
  dashboardStats: {
    totalDonors: 1250,
    activeRecipients: 85,
    hospitalPartners: 32,
    emergencyRequests: 7,
    bloodUnitsAvailable: 2840,
    organsAvailable: 15,
  },
  bloodInventory: [
    { bloodType: 'A+', units: 450, shortage: false },
    { bloodType: 'A-', units: 120, shortage: true },
    { bloodType: 'B+', units: 380, shortage: false },
    { bloodType: 'B-', units: 75, shortage: true },
    { bloodType: 'AB+', units: 95, shortage: false },
    { bloodType: 'AB-', units: 25, shortage: true },
    { bloodType: 'O+', units: 690, shortage: false },
    { bloodType: 'O-', units: 180, shortage: true },
  ],
  recentDonations: [
    { id: 1, donor: 'John Smith', type: 'Blood - O+', date: '2024-01-15', hospital: 'City General' },
    { id: 2, donor: 'Sarah Johnson', type: 'Platelets', date: '2024-01-15', hospital: 'Metro Medical' },
    { id: 3, donor: 'Mike Davis', type: 'Blood - A-', date: '2024-01-14', hospital: 'St. Mary\'s' },
  ],
  emergencyRequests: [
    { id: 1, patient: 'Emergency Patient #1', bloodType: 'O-', urgency: 'Critical', hospital: 'Central Hospital', timeLeft: '45 min' },
    { id: 2, patient: 'Jane Doe', bloodType: 'AB+', urgency: 'High', hospital: 'City General', timeLeft: '2 hours' },
    { id: 3, patient: 'Robert Wilson', bloodType: 'B-', urgency: 'Medium', hospital: 'Regional Medical', timeLeft: '6 hours' },
  ],
  donors: [
    { id: 1, name: 'John Smith', bloodType: 'O+', phone: '+1234567890', email: 'john@email.com', location: 'New York', lastDonation: '2024-01-15', eligible: true },
    { id: 2, name: 'Sarah Johnson', bloodType: 'A+', phone: '+1234567891', email: 'sarah@email.com', location: 'Los Angeles', lastDonation: '2024-01-10', eligible: true },
    { id: 3, name: 'Mike Davis', bloodType: 'B-', phone: '+1234567892', email: 'mike@email.com', location: 'Chicago', lastDonation: '2024-01-08', eligible: false },
  ],
};

// API functions with fallback to mock data
export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.log('API not available, using mock data');
      return mockData.dashboardStats;
    }
  },
  
  getBloodInventory: async () => {
    try {
      const response = await api.get('/inventory/blood');
      return response.data;
    } catch (error) {
      return mockData.bloodInventory;
    }
  },
  
  getRecentDonations: async () => {
    try {
      const response = await api.get('/donations/recent');
      return response.data;
    } catch (error) {
      return mockData.recentDonations;
    }
  },
};

export const donorAPI = {
  getAllDonors: async () => {
    try {
      const response = await api.get('/donors');
      return response.data;
    } catch (error) {
      return mockData.donors;
    }
  },
  
  createDonor: async (donorData: any) => {
    try {
      const response = await api.post('/donors', donorData);
      return response.data;
    } catch (error) {
      // Mock response for demo
      return { id: Date.now(), ...donorData, eligible: true };
    }
  },
  
  updateDonor: async (id: number, donorData: any) => {
    try {
      const response = await api.put(`/donors/${id}`, donorData);
      return response.data;
    } catch (error) {
      return { id, ...donorData };
    }
  },
  
  deleteDonor: async (id: number) => {
    try {
      const response = await api.delete(`/donors/${id}`);
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },
  
  checkEligibility: async (eligibilityData: any) => {
    try {
      const response = await api.post('/donors/check-eligibility', eligibilityData);
      return response.data;
    } catch (error) {
      // Mock eligibility check logic
      const { hasTattoo, hasPiercing } = eligibilityData;
      const isEligible = !hasTattoo && !hasPiercing; // Simple mock logic
      
      return {
        eligible: isEligible,
        message: isEligible 
          ? 'Congratulations! You are eligible to donate. Please visit our hospital during working hours (9 AM - 5 PM).'
          : 'Unfortunately, you are not currently eligible to donate due to recent tattoo or piercing. Please wait 6 months and try again.',
        doctorNotification: isEligible,
        workingHours: '9:00 AM - 5:00 PM, Monday to Friday'
      };
    }
  },
};

export const emergencyAPI = {
  getEmergencyRequests: async () => {
    try {
      const response = await api.get('/emergency/requests');
      return response.data;
    } catch (error) {
      return mockData.emergencyRequests;
    }
  },
  
  createEmergencyRequest: async (requestData: any) => {
    try {
      const response = await api.post('/emergency/requests', requestData);
      return response.data;
    } catch (error) {
      return { id: Date.now(), ...requestData, status: 'active' };
    }
  },
  
  notifyDonors: async (requestId: number) => {
    try {
      const response = await api.post(`/emergency/notify/${requestId}`);
      return response.data;
    } catch (error) {
      return { success: true, notified: 25 };
    }
  },
};

export const aiMatchingAPI = {
  findMatches: async (criteria: any) => {
    try {
      const response = await api.post('/ai/match', criteria);
      return response.data;
    } catch (error) {
      // Mock AI matching results
      return {
        matches: [
          { donorId: 1, compatibility: 95, distance: 2.5, availability: 'immediate' },
          { donorId: 2, compatibility: 88, distance: 5.2, availability: 'within 2 hours' },
          { donorId: 3, compatibility: 82, distance: 8.1, availability: 'within 4 hours' },
        ],
        totalMatches: 15,
        bestMatch: { donorId: 1, compatibility: 95 }
      };
    }
  },
};

export default api;
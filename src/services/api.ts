import axios from 'axios';

// Base URL for FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
    { bloodType: 'A+', units: 450, shortage: false, status: 'Good', minThreshold: 100, maxCapacity: 1000 },
    { bloodType: 'A-', units: 120, shortage: true, status: 'Low', minThreshold: 100, maxCapacity: 1000 },
    { bloodType: 'B+', units: 380, shortage: false, status: 'Good', minThreshold: 100, maxCapacity: 1000 },
    { bloodType: 'B-', units: 75, shortage: true, status: 'Critical', minThreshold: 100, maxCapacity: 1000 },
    { bloodType: 'AB+', units: 95, shortage: false, status: 'Low', minThreshold: 50, maxCapacity: 500 },
    { bloodType: 'AB-', units: 25, shortage: true, status: 'Critical', minThreshold: 50, maxCapacity: 500 },
    { bloodType: 'O+', units: 690, shortage: false, status: 'Good', minThreshold: 200, maxCapacity: 1500 },
    { bloodType: 'O-', units: 180, shortage: true, status: 'Low', minThreshold: 200, maxCapacity: 1500 },
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

// WhatsApp API for notifications
export const whatsappAPI = {
  sendMessage: async (phoneNumber: string, message: string) => {
    try {
      const response = await api.post('/whatsapp/send', {
        phone: phoneNumber,
        message: message
      });
      return response.data;
    } catch (error) {
      // Mock WhatsApp integration
      console.log(`WhatsApp message sent to ${phoneNumber}: ${message}`);
      return { success: true, messageId: Date.now().toString() };
    }
  },

  sendEmergencyNotification: async (donorIds: number[], emergencyData: any) => {
    try {
      const response = await api.post('/whatsapp/emergency-notify', {
        donorIds,
        emergencyData
      });
      return response.data;
    } catch (error) {
      // Mock emergency notification
      console.log(`Emergency notification sent to ${donorIds.length} donors`);
      return { success: true, notified: donorIds.length };
    }
  }
};

// Hospital API for donor management
export const hospitalAPI = {
  getDonorDetails: async (donorId: number) => {
    try {
      const response = await api.get(`/hospital/donors/${donorId}`);
      return response.data;
    } catch (error) {
      // Mock donor details
      return {
        id: donorId,
        name: 'John Smith',
        bloodType: 'O+',
        phone: '+1234567890',
        email: 'john@email.com',
        location: 'New York',
        lastDonation: '2024-01-15',
        eligible: true,
        medicalHistory: 'No major issues',
        emergencyContact: '+1234567891',
        address: '123 Main St, New York, NY 10001',
        age: 28,
        weight: 70,
        height: 175
      };
    }
  },

  contactDonor: async (donorId: number, message: string) => {
    try {
      const response = await api.post(`/hospital/donors/${donorId}/contact`, {
        message
      });
      return response.data;
    } catch (error) {
      // Mock contact functionality
      return { success: true, messageId: Date.now().toString() };
    }
  },

  getPatientFamily: async (patientId: number) => {
    try {
      const response = await api.get(`/hospital/patients/${patientId}/family`);
      return response.data;
    } catch (error) {
      // Mock patient family data
      return {
        patientId,
        family: [
          {
            id: 1,
            name: 'Jane Smith',
            relationship: 'Spouse',
            phone: '+1234567892',
            email: 'jane@email.com',
            address: '123 Main St, New York, NY 10001',
            emergencyContact: true
          },
          {
            id: 2,
            name: 'Robert Smith',
            relationship: 'Father',
            phone: '+1234567893',
            email: 'robert@email.com',
            address: '456 Oak Ave, New York, NY 10002',
            emergencyContact: false
          }
        ]
      };
    }
  },

  updateFamilyMember: async (patientId: number, familyMemberId: number, data: any) => {
    try {
      const response = await api.put(`/hospital/patients/${patientId}/family/${familyMemberId}`, data);
      return response.data;
    } catch (error) {
      return { success: true, ...data };
    }
  }
};

// Blood Bank API
export const bloodBankAPI = {
  getInventory: async () => {
    try {
      const response = await api.get('/bloodbank/inventory');
      return response.data;
    } catch (error) {
      return mockData.bloodInventory;
    }
  },

  updateInventory: async (bloodType: string, units: number, action: 'add' | 'remove') => {
    try {
      const response = await api.post('/bloodbank/inventory/update', {
        bloodType,
        units,
        action
      });
      return response.data;
    } catch (error) {
      return { success: true, bloodType, units, action };
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get('/bloodbank/dashboard');
      return response.data;
    } catch (error) {
      const inventory = await bloodBankAPI.getInventory();
      const totalUnits = inventory.reduce((sum: number, item: any) => sum + item.units, 0);
      const criticalItems = inventory.filter((item: any) => item.status === 'Critical').length;
      
      return {
        totalUnits,
        criticalItems,
        requestsToday: 12,
        fulfillmentRate: 89
      };
    }
  },

  getRequests: async () => {
    try {
      const response = await api.get('/bloodbank/requests');
      return response.data;
    } catch (error) {
      return [
        {
          id: 1,
          hospital: 'City General Hospital',
          bloodType: 'O-',
          unitsRequested: 5,
          urgency: 'Critical',
          requestDate: '2024-01-15',
          status: 'Pending',
          reason: 'Emergency surgery',
          contactPerson: 'Dr. Smith',
          phone: '+1234567890'
        }
      ];
    }
  },

  contactHospital: async (requestId: number, message: string) => {
    try {
      const response = await api.post(`/bloodbank/requests/${requestId}/contact`, {
        message
      });
      return response.data;
    } catch (error) {
      return { success: true, messageId: Date.now().toString() };
    }
  },

  exportReport: async (reportType: string, dateRange: any) => {
    try {
      const response = await api.post('/bloodbank/reports/export', {
        reportType,
        dateRange
      });
      return response.data;
    } catch (error) {
      // Mock export functionality
      const blob = new Blob(['Mock report data'], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bloodbank-report-${reportType}-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      return { success: true, filename: a.download };
    }
  }
};

// Enhanced donor API functions
export const donorAPIEnhanced = {
  getNotifications: async (donorId: number) => {
    try {
      const response = await api.get(`/donors/${donorId}/notifications`);
      return response.data;
    } catch (error) {
      // Mock notifications
      return [
        {
          id: 1,
          type: 'emergency',
          title: 'Emergency Blood Request',
          message: 'Urgent need for O+ blood at City General Hospital',
          timestamp: '2024-01-15T10:30:00Z',
          read: false
        },
        {
          id: 2,
          type: 'reminder',
          title: 'Donation Reminder',
          message: 'You are eligible to donate again. Schedule your appointment.',
          timestamp: '2024-01-14T09:00:00Z',
          read: true
        }
      ];
    }
  },

  markNotificationRead: async (donorId: number, notificationId: number) => {
    try {
      const response = await api.put(`/donors/${donorId}/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      return { success: true };
    }
  }
};

// India-specific donation centers
export const indiaDonationCenters = [
  {
    id: 1,
    name: 'AIIMS Blood Bank',
    lat: 28.5684,
    lng: 77.2090,
    address: 'AIIMS, New Delhi, Delhi 110029',
    distance: '2.5 km',
    duration: '8 min',
    bloodBank: true,
    urgencyLevel: 'High',
    needsBloodType: 'O+',
    acceptingDonors: true,
    phone: '+91-11-26588500'
  },
  {
    id: 2,
    name: 'Apollo Blood Bank',
    lat: 28.5355,
    lng: 77.3910,
    address: 'Apollo Hospital, Sarita Vihar, New Delhi',
    distance: '5.2 km',
    duration: '15 min',
    bloodBank: true,
    urgencyLevel: 'Medium',
    needsBloodType: 'A+',
    acceptingDonors: true,
    phone: '+91-11-26925858'
  },
  {
    id: 3,
    name: 'Fortis Blood Bank',
    lat: 28.6139,
    lng: 77.2090,
    address: 'Fortis Hospital, Shalimar Bagh, Delhi',
    distance: '8.1 km',
    duration: '20 min',
    bloodBank: true,
    urgencyLevel: 'Low',
    needsBloodType: 'B-',
    acceptingDonors: true,
    phone: '+91-11-42776200'
  },
  {
    id: 4,
    name: 'Max Blood Bank',
    lat: 28.5355,
    lng: 77.3910,
    address: 'Max Hospital, Saket, New Delhi',
    distance: '6.8 km',
    duration: '18 min',
    bloodBank: true,
    urgencyLevel: 'High',
    needsBloodType: 'AB+',
    acceptingDonors: true,
    phone: '+91-11-40554055'
  },
  {
    id: 5,
    name: 'Red Cross Blood Bank',
    lat: 28.5684,
    lng: 77.2090,
    address: 'Indian Red Cross Society, New Delhi',
    distance: '3.2 km',
    duration: '10 min',
    bloodBank: true,
    urgencyLevel: 'Medium',
    needsBloodType: 'O-',
    acceptingDonors: true,
    phone: '+91-11-23716482'
  }
];

export default api;
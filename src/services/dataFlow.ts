// Data Flow Service for Cross-Profile Interactions
import { whatsappAPI, donorAPI, hospitalAPI, bloodBankAPI } from './api';

export interface CrossProfileEvent {
  id: string;
  type: 'donor_registration' | 'emergency_request' | 'donation_completed' | 'inventory_alert' | 'request_fulfilled';
  sourceProfile: 'donor' | 'hospital' | 'bloodbank' | 'patient';
  targetProfiles: string[];
  data: any;
  timestamp: string;
  processed: boolean;
}

class DataFlowService {
  private events: CrossProfileEvent[] = [];

  // Register a new donor and notify relevant profiles
  async registerDonor(donorData: any) {
    try {
      // Create donor
      const donor = await donorAPI.createDonor(donorData);
      
      // Notify hospitals about new donor
      await this.notifyHospitals('new_donor', {
        donorId: donor.id,
        bloodType: donor.bloodType,
        location: donor.location,
        name: donor.name
      });

      // Notify blood banks about new donor
      await this.notifyBloodBanks('new_donor', {
        donorId: donor.id,
        bloodType: donor.bloodType,
        location: donor.location,
        name: donor.name
      });

      return donor;
    } catch (error) {
      console.error('Failed to register donor:', error);
      throw error;
    }
  }

  // Handle emergency request and notify donors
  async handleEmergencyRequest(emergencyData: any) {
    try {
      // Find matching donors
      const matchingDonors = await this.findMatchingDonors(emergencyData.bloodType, emergencyData.location);
      
      // Send WhatsApp notifications to donors
      for (const donor of matchingDonors) {
        await whatsappAPI.sendMessage(donor.phone, 
          `🚨 EMERGENCY BLOOD REQUEST 🚨\n\n` +
          `Patient: ${emergencyData.patient}\n` +
          `Blood Type Needed: ${emergencyData.bloodType}\n` +
          `Hospital: ${emergencyData.hospital}\n` +
          `Urgency: ${emergencyData.urgency}\n` +
          `Time Left: ${emergencyData.timeLeft}\n\n` +
          `Please contact the hospital immediately if you can help!`
        );
      }

      // Notify blood banks about emergency
      await this.notifyBloodBanks('emergency_request', emergencyData);

      return { notified: matchingDonors.length };
    } catch (error) {
      console.error('Failed to handle emergency request:', error);
      throw error;
    }
  }

  // Handle donation completion and update inventory
  async handleDonationCompleted(donationData: any) {
    try {
      // Update blood bank inventory
      await bloodBankAPI.updateInventory(donationData.bloodType, donationData.units, 'add');
      
      // Notify hospital about donation
      await this.notifyHospitals('donation_completed', donationData);
      
      // Update donor's last donation date
      await donorAPI.updateDonor(donationData.donorId, {
        lastDonation: new Date().toISOString().split('T')[0]
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to handle donation completion:', error);
      throw error;
    }
  }

  // Handle inventory alerts
  async handleInventoryAlert(alertData: any) {
    try {
      // Notify hospitals about low stock
      await this.notifyHospitals('inventory_alert', alertData);
      
      // Notify blood bank staff
      await this.notifyBloodBankStaff('inventory_alert', alertData);

      return { success: true };
    } catch (error) {
      console.error('Failed to handle inventory alert:', error);
      throw error;
    }
  }

  // Handle request fulfillment
  async handleRequestFulfilled(requestData: any) {
    try {
      // Update blood bank inventory
      await bloodBankAPI.updateInventory(requestData.bloodType, requestData.units, 'remove');
      
      // Notify hospital about fulfillment
      await this.notifyHospitals('request_fulfilled', requestData);
      
      // Notify donor if applicable
      if (requestData.donorId) {
        await this.notifyDonor(requestData.donorId, 'request_fulfilled', requestData);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to handle request fulfillment:', error);
      throw error;
    }
  }

  // Private helper methods
  private async findMatchingDonors(bloodType: string, location: string) {
    // This would typically query a database for matching donors
    // For now, return mock data
    return [
      { id: 1, name: 'John Smith', phone: '+1234567890', bloodType: 'O+', location: 'New York' },
      { id: 2, name: 'Sarah Johnson', phone: '+1234567891', bloodType: 'O+', location: 'New York' }
    ];
  }

  private async notifyHospitals(eventType: string, data: any) {
    // This would typically send notifications to hospital systems
    console.log(`Notifying hospitals about ${eventType}:`, data);
  }

  private async notifyBloodBanks(eventType: string, data: any) {
    // This would typically send notifications to blood bank systems
    console.log(`Notifying blood banks about ${eventType}:`, data);
  }

  private async notifyBloodBankStaff(eventType: string, data: any) {
    // This would typically send notifications to blood bank staff
    console.log(`Notifying blood bank staff about ${eventType}:`, data);
  }

  private async notifyDonor(donorId: number, eventType: string, data: any) {
    try {
      const donor = await donorAPI.getNotifications(donorId);
      // Add notification to donor's notification list
      console.log(`Notifying donor ${donorId} about ${eventType}:`, data);
    } catch (error) {
      console.error('Failed to notify donor:', error);
    }
  }

  // Get all events for a specific profile
  getEventsForProfile(profileType: string): CrossProfileEvent[] {
    return this.events.filter(event => 
      event.sourceProfile === profileType || 
      event.targetProfiles.includes(profileType)
    );
  }

  // Mark event as processed
  markEventProcessed(eventId: string) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.processed = true;
    }
  }
}

export const dataFlowService = new DataFlowService();
export default dataFlowService;

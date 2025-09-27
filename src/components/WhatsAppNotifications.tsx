import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Check, 
  CheckCheck, 
  Clock, 
  Phone,
  MapPin,
  Droplets,
  Building2,
  AlertCircle,
  Calendar,
  User
} from 'lucide-react';
import { formatDistance } from 'date-fns';

const mockNotifications = [
  {
    id: 1,
    from: 'City General Hospital',
    fromType: 'Hospital',
    message: 'Urgent: We need O+ blood donors immediately. Can you help us save lives today?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    replied: false,
    priority: 'High',
    bloodType: 'O+',
    location: 'New York, NY',
    estimatedTime: '15 min drive',
    type: 'emergency_request'
  },
  {
    id: 2,
    from: 'Metro Blood Bank',
    fromType: 'Blood Bank',
    message: 'Thank you for your donation last week! Your contribution helped save 3 lives. Schedule your next donation?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    replied: false,
    priority: 'Low',
    bloodType: null,
    location: 'Brooklyn, NY',
    estimatedTime: '22 min drive',
    type: 'thank_you'
  },
  {
    id: 3,
    from: 'Regional Medical Center',
    fromType: 'Hospital',
    message: 'Reminder: Your scheduled blood donation appointment is tomorrow at 2:00 PM. Please confirm your attendance.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    replied: true,
    priority: 'Medium',
    bloodType: 'O+',
    location: 'Manhattan, NY',
    estimatedTime: '12 min drive',
    type: 'appointment_reminder'
  },
  {
    id: 4,
    from: 'St. Mary\'s Hospital',
    fromType: 'Hospital',
    message: 'A patient with your blood type needs help. Would you be available for donation this weekend?',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: true,
    replied: false,
    priority: 'Medium',
    bloodType: 'O+',
    location: 'Queens, NY',
    estimatedTime: '28 min drive',
    type: 'donation_request'
  }
];

export default function WhatsAppNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsReplied = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, replied: true, read: true } : notif
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency_request': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'appointment_reminder': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'donation_request': return <Droplets className="h-4 w-4 text-purple-500" />;
      case 'thank_you': return <Check className="h-4 w-4 text-green-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            WhatsApp Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-1" />
            Open WhatsApp
          </Button>
        </CardTitle>
        <CardDescription>
          Messages from hospitals and blood banks for donation requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all cursor-pointer hover:shadow-md ${
                  !notification.read 
                    ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' 
                    : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{notification.from}</p>
                        <p className="text-xs text-muted-foreground">{notification.fromType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(notification.type)}
                      <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-l-green-500">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {notification.message}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{notification.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{notification.estimatedTime}</span>
                    </div>
                    {notification.bloodType && (
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-red-500" />
                        <span>Blood Type: {notification.bloodType}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{formatDistance(notification.timestamp, new Date(), { addSuffix: true })}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {notification.read ? (
                        <>
                          <CheckCheck className="h-3 w-3 text-blue-500" />
                          Read
                        </>
                      ) : (
                        <>
                          <Check className="h-3 w-3" />
                          Unread
                        </>
                      )}
                      {notification.replied && (
                        <>
                          <span>•</span>
                          <MessageSquare className="h-3 w-3 text-green-500" />
                          Replied
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!notification.replied && (
                        <>
                          <Button 
                            size="sm" 
                            className="h-7 px-2 text-xs bg-green-500 hover:bg-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsReplied(notification.id);
                              alert('Response sent: "Yes, I can donate!"');
                            }}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsReplied(notification.id);
                              alert('Response sent: "Sorry, not available right now."');
                            }}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2 text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {notifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No WhatsApp notifications yet</p>
            <p className="text-sm">Messages from hospitals will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
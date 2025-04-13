
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Package, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLiveMap } from '@/hooks/useLiveMap';
import { useNavigate } from 'react-router-dom';

const EventCalendar = () => {
  const { events } = useLiveMap();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter((event) => {
    if (!date) return false;
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });

  const getIconForEventType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="text-yellow-400" />;
      case 'drop': return <Package className="text-blue-400" />;
      case 'challenge': return <Target className="text-red-400" />;
      case 'teamevent': return <Users className="text-purple-400" />;
      default: return null;
    }
  };

  const handleViewEvent = (event: any) => {
    if (event.challengeId) {
      navigate(`/challenge/${event.challengeId}`);
    }
  };

  return (
    <div className="grid md:grid-cols-5 gap-4">
      <Card className="col-span-2 h-fit glassmorphism border-0">
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
          <CardDescription>Browse upcoming challenges and events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3 glassmorphism border-0">
        <CardHeader>
          <CardTitle>
            {date ? date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Select a date'}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length === 0 
              ? 'No events scheduled for this day' 
              : `${selectedDateEvents.length} events scheduled`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No events found for the selected date.</p>
                <p className="text-sm">Try selecting a different date or check back later!</p>
              </div>
            ) : (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="neon-card">
                  <div className="neon-card-content p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getIconForEventType(event.type)}
                        <h3 className="font-medium">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-sm mt-2">
                        <span className="font-medium">Time:</span> {new Date(event.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                      {event.location && (
                        <div className="text-sm">
                          <span className="font-medium">Location:</span> {event.location}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant={event.challengeId ? "default" : "secondary"}
                      onClick={() => handleViewEvent(event)}
                    >
                      {event.challengeId ? 'View Challenge' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;

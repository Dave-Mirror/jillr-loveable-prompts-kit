
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { MapPin, Clock, Calendar as CalendarIcon, Gift, Target, Users, Award } from 'lucide-react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Event } from '@/types/livemap';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

const EventCalendar = () => {
  const { events } = useLiveMap();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Filter events for the selected date
  const filteredEvents = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );

  // Get dates that have events
  const eventDates = events.map(event => new Date(event.date));
  
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="h-4 w-4 text-yellow-500" />;
      case 'drop': return <Target className="h-4 w-4 text-blue-500" />;
      case 'challenge': return <Award className="h-4 w-4 text-red-500" />;
      case 'teamevent': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-jillr-dark border-jillr-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-jillr-neonPurple" />
            Challenge Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border-jillr-border"
            modifiers={{
              event: (date) => eventDates.some(eventDate => 
                isSameDay(date, eventDate)
              )
            }}
            modifiersClassNames={{
              event: "bg-jillr-neonPurple/20 font-bold text-jillr-neonPurple relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:bg-jillr-neonPurple after:rounded-full"
            }}
            disabled={(date) => {
              const now = new Date();
              const sixMonthsAgo = new Date();
              sixMonthsAgo.setMonth(now.getMonth() - 6);
              const sixMonthsFromNow = new Date();
              sixMonthsFromNow.setMonth(now.getMonth() + 6);
              
              return date < sixMonthsAgo || date > sixMonthsFromNow;
            }}
          />
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-jillr-neonPurple" />
          Events am {format(selectedDate, 'dd.MM.yyyy')}
        </h3>
        
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-jillr-border rounded-lg">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
            <p className="text-muted-foreground">
              Keine Events an diesem Tag
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-jillr-dark border-jillr-border overflow-hidden">
                <div className="flex">
                  <div className={cn(
                    "w-2",
                    event.type === 'easteregg' && "bg-yellow-500",
                    event.type === 'drop' && "bg-blue-500",
                    event.type === 'challenge' && "bg-red-500",
                    event.type === 'teamevent' && "bg-purple-500"
                  )}></div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold mb-1 flex items-center gap-2">
                        {getEventTypeIcon(event.type)}
                        {event.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type === 'easteregg' ? 'Easter Egg' :
                         event.type === 'drop' ? 'Product Drop' :
                         event.type === 'challenge' ? 'Challenge' :
                         'Team Event'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      {event.location && (
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}
                      
                      <a 
                        href={`/challenge/${event.challengeId || '#'}`}
                        className={cn(
                          buttonVariants({ size: "sm", variant: "outline" }),
                          "text-xs"
                        )}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;

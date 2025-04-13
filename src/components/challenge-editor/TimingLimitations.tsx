
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TimingLimitations = ({ data, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Challenge Duration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Set the start and end dates for your challenge.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="startDate"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !data.startDate && "text-muted-foreground"
                        )}
                      >
                        {data.startDate ? (
                          format(data.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.startDate}
                      onSelect={(date) => onChange({ startDate: date })}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When the challenge should begin
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            name="endDate"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !data.endDate && "text-muted-foreground"
                        )}
                      >
                        {data.endDate ? (
                          format(data.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.endDate}
                      onSelect={(date) => onChange({ endDate: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When the challenge should end (must be in the future)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        
        <div className="mt-6">
          <p className="text-sm">Challenge Duration: <span className="font-medium">
            {data.startDate && data.endDate ? 
              Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0} days
          </span></p>
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          name="maxParticipants"
          render={() => (
            <FormItem>
              <FormLabel>Maximum Participants (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Leave empty for unlimited"
                  min={0}
                  value={data.maxParticipants || ''}
                  onChange={(e) => onChange({ maxParticipants: parseInt(e.target.value) || 0 })}
                />
              </FormControl>
              <FormDescription>
                Limit the number of participants who can join the challenge (0 or empty for unlimited)
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TimingLimitations;

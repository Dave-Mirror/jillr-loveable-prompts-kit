
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Award, Calendar, Flag, Globe, Hash, Info, Medal, Music, Target, Video, Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PreviewPublish = ({ data, onChange }) => {
  const [previewMedia, setPreviewMedia] = useState({
    type: data.previewMediaType || 'image',
    url: data.previewMediaUrl || ''
  });

  const handleMediaUpload = (mediaType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = mediaType === 'image' ? 'image/*' : 'video/*';
    
    input.onchange = (e) => {
      // Properly type the event target as HTMLInputElement
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0]; // Use optional chaining
      if (!file) return;
      
      // Check file size (max 50MB for videos, 5MB for images)
      const maxSize = mediaType === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`Datei zu groß. Maximum: ${mediaType === 'image' ? '5MB' : '50MB'}`);
        return;
      }
      
      const url = URL.createObjectURL(file);
      setPreviewMedia({ type: mediaType, url });
      
      // Update the parent component's data
      onChange({ 
        previewMediaType: mediaType, 
        previewMediaUrl: url 
      });
      
      toast.success(`${mediaType === 'image' ? 'Bild' : 'Video'} erfolgreich hochgeladen`);
    };
    
    input.click();
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Challenge Preview</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Review your challenge before publishing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-bold">{data.title || "Challenge Title"}</h4>
              <p className="mt-2 text-muted-foreground">{data.description || "Challenge description will appear here."}</p>
              
              {/* Preview Media Section */}
              <div className="mt-4 mb-4">
                <div className="aspect-video rounded-md overflow-hidden bg-jillr-darkBlue/30 border border-jillr-border/30">
                  {previewMedia.url ? (
                    previewMedia.type === 'video' ? (
                      <video 
                        src={previewMedia.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={previewMedia.url}
                        className="w-full h-full object-cover"
                        alt="Challenge preview"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <p>Lade ein Vorschaubild oder -video hoch</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-2 justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleMediaUpload('image')}
                    className="flex items-center gap-1"
                  >
                    <Image className="h-4 w-4" />
                    Bild hochladen
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleMediaUpload('video')}
                    className="flex items-center gap-1"
                  >
                    <Video className="h-4 w-4" />
                    Video hochladen
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-jillr-neonPurple" />
                  <span>
                    {data.startDate ? data.startDate.toLocaleDateString() : "Start date"} - {data.endDate ? data.endDate.toLocaleDateString() : "End date"}
                  </span>
                </div>
                
                {data.type.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      {data.type.map((t, i) => (
                        <span key={t}>
                          {i > 0 && ", "}
                          {t.charAt(0).toUpperCase() + t.slice(1)} Challenge
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                
                {data.contentFormats.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Required: {data.contentFormats.join(', ')}
                    </span>
                  </div>
                )}
                
                {data.hashtags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Hashtags: {data.hashtags.join(' ')}
                    </span>
                  </div>
                )}
                
                {data.musicSelection && (
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Music: {data.musicSelection === 'trending' ? 'Trending sounds' : 
                             data.musicSelection === 'brand' ? 'Brand sounds' :
                             data.musicSelection === 'library' ? 'Jillr library' : 'None'}
                    </span>
                  </div>
                )}
                
                {data.location && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Location: {data.location}
                    </span>
                  </div>
                )}
                
                {data.levelRestriction !== 'open' && (
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Level: {data.levelRestriction === 'level2' ? 'Level 2+' : 
                             data.levelRestriction === 'level3' ? 'Level 3+' : 'Level 4/5 only'}
                    </span>
                  </div>
                )}
                
                {data.rewardTypes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-jillr-neonPurple" />
                    <span>
                      Rewards: {data.rewardTypes.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-5 w-5 text-jillr-neonPurple" />
                  Audience & KPIs
                </h4>
                
                <div className="mt-4 space-y-2 text-sm">
                  {data.gender.length > 0 && (
                    <p>Gender: {data.gender.join(', ')}</p>
                  )}
                  
                  {data.ageRange && (
                    <p>Age range: {data.ageRange[0]} - {data.ageRange[1]}</p>
                  )}
                  
                  {data.kpis.length > 0 && (
                    <p>KPIs: {data.kpis.join(', ')}</p>
                  )}
                  
                  {(data.minViews > 0 || data.minLikes > 0 || data.minComments > 0) && (
                    <p>
                      Minimums: 
                      {data.minViews > 0 ? ` ${data.minViews} views` : ''}
                      {data.minLikes > 0 ? ` ${data.minLikes} likes` : ''}
                      {data.minComments > 0 ? ` ${data.minComments} comments` : ''}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium flex items-center gap-2">
                  <Info className="h-5 w-5 text-jillr-neonPurple" />
                  Additional Information
                </h4>
                
                <div className="mt-4 space-y-2 text-sm">
                  {data.formatRequirements && data.formatRequirements !== 'none' && (
                    <p>Format: {data.formatRequirements}</p>
                  )}
                  
                  {data.maxParticipants > 0 && (
                    <p>Limited to {data.maxParticipants} participants</p>
                  )}
                  
                  {data.licenseRights && (
                    <p>Company can reuse content</p>
                  )}
                  
                  {data.contentGuidelines && (
                    <div>
                      <p className="font-medium">Content guidelines:</p>
                      <p className="text-muted-foreground">{data.contentGuidelines.substring(0, 100)}{data.contentGuidelines.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Publishing Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem className="space-y-3">
            <FormLabel>Test the challenge with a live preview?</FormLabel>
            <RadioGroup 
              defaultValue={data.livePreview ? "yes" : "no"}
              onValueChange={(value) => onChange({ livePreview: value === "yes" })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="preview-yes" />
                <label htmlFor="preview-yes" className="cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="preview-no" />
                <label htmlFor="preview-no" className="cursor-pointer">No</label>
              </div>
            </RadioGroup>
          </FormItem>
          
          <FormItem className="space-y-3">
            <FormLabel>Enable A/B testing?</FormLabel>
            <RadioGroup 
              defaultValue={data.abTesting ? "yes" : "no"}
              onValueChange={(value) => onChange({ abTesting: value === "yes" })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="ab-yes" />
                <label htmlFor="ab-yes" className="cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="ab-no" />
                <label htmlFor="ab-no" className="cursor-pointer">No</label>
              </div>
            </RadioGroup>
            <FormDescription>
              Automatically test different versions to find the most effective setup
            </FormDescription>
          </FormItem>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Share Challenge Upon Publishing</h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="share-social" 
                checked={data.socialSharing}
                onCheckedChange={(checked) => onChange({ socialSharing: checked === true })}
              />
              <div>
                <label 
                  htmlFor="share-social"
                  className="font-medium text-sm cursor-pointer"
                >
                  Share on social media & partner platforms
                </label>
                <p className="text-sm text-muted-foreground">
                  Automatically share to connected social platforms
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="push-notif" 
                checked={data.pushNotification}
                onCheckedChange={(checked) => onChange({ pushNotification: checked === true })}
              />
              <div>
                <label 
                  htmlFor="push-notif"
                  className="font-medium text-sm cursor-pointer"
                >
                  Send push notification to Jillr users
                </label>
                <p className="text-sm text-muted-foreground">
                  Notify users who match your target audience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPublish;

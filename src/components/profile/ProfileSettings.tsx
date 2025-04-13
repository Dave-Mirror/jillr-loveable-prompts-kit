
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, Bell, Lock, PaintBucket, Tag, Globe, User, Mail, MessageSquare,
  MapPin, Shield, Smartphone, Eye, EyeOff, UserCheck, UserX, History, LogOut, 
  AlertTriangle, Key, Zap, Info, Clock, Calendar, Fingerprint
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSettingsProps {
  userProfile: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('account');
  const { toast } = useToast();
  
  // Mock data for settings - would come from database in real app
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    challenges: true,
    marketing: false,
    followers: true,
    messages: true,
    nearbyEvents: true,
    expiringRewards: true,
    challengeUpdates: true,
    communityInteractions: true,
    vipOffers: false
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    allowTagging: true,
    showLocation: false,
    contentVisibility: 'public',
    whoCanMessage: 'followers',
    whoCanTag: 'followers',
    showInLeaderboards: true,
    allowPersonalizedRecommendations: true,
    allowAnonymousDataAnalysis: true,
    allowUGCChallenges: true
  });
  
  const [preferences, setPreferences] = useState({
    categories: ['Fashion', 'Dance', 'Travel'],
    theme: 'dark',
    language: 'en'
  });

  const [locationSettings, setLocationSettings] = useState({
    locationEnabled: true,
    useSmartDisplays: true,
    easterEggReminders: true
  });

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been successfully updated.`,
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 w-full mb-6">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-jillr-neonPurple" />
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="JillrCreator" />
                <p className="text-xs text-muted-foreground">
                  Must be unique, 4-20 characters long
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input id="phone" type="tel" placeholder="+49 123 4567890" />
              </div>
              <Button className="w-full" onClick={() => handleSaveSettings('account')}>Update Account Information</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-jillr-neonBlue" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters, special character required
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">
                    Enhance your account security with 2FA
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
              <Button className="w-full" onClick={() => handleSaveSettings('security')}>Change Password</Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible account actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-md bg-red-500/5">
                <div>
                  <h4 className="font-medium">Deactivate Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable your account. You can reactivate anytime.
                  </p>
                </div>
                <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                  Deactivate
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-md bg-red-500/5">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data. This cannot be undone.
                  </p>
                </div>
                <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="privacy">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-jillr-neonPurple" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control your profile visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select defaultValue={privacy.profileVisibility} onValueChange={(val) => setPrivacy({...privacy, profileVisibility: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Everyone)</SelectItem>
                      <SelectItem value="followers">Followers Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls who can view your profile and content
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Content Visibility</Label>
                  <Select defaultValue={privacy.contentVisibility} onValueChange={(val) => setPrivacy({...privacy, contentVisibility: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Everyone)</SelectItem>
                      <SelectItem value="followers">Followers Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls who can view your uploaded content
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="leaderboards">Show in Leaderboards</Label>
                    <p className="text-xs text-muted-foreground">
                      Display your profile in public leaderboards
                    </p>
                  </div>
                  <Switch 
                    id="leaderboards" 
                    checked={privacy.showInLeaderboards}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showInLeaderboards: checked})}
                  />
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={() => handleSaveSettings('privacy')}>
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-jillr-neonBlue" />
                Tagging & Mentions
              </CardTitle>
              <CardDescription>
                Control who can tag and mention you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-tagging">Allow Tagging</Label>
                  <p className="text-xs text-muted-foreground">
                    Let others tag you in challenges and content
                  </p>
                </div>
                <Switch 
                  id="allow-tagging" 
                  checked={privacy.allowTagging}
                  onCheckedChange={(checked) => setPrivacy({...privacy, allowTagging: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Who Can Tag You</Label>
                <Select 
                  defaultValue={privacy.whoCanTag}
                  onValueChange={(val) => setPrivacy({...privacy, whoCanTag: val})}
                  disabled={!privacy.allowTagging}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select who can tag you" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="nobody">Nobody</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-location">Show Location</Label>
                  <p className="text-xs text-muted-foreground">
                    Display your location on your profile
                  </p>
                </div>
                <Switch 
                  id="show-location" 
                  checked={privacy.showLocation}
                  onCheckedChange={(checked) => setPrivacy({...privacy, showLocation: checked})}
                />
              </div>
              
              <Button className="w-full" onClick={() => handleSaveSettings('tagging')}>
                Save Tagging Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-jillr-neonGreen" />
                Personalization & Data
              </CardTitle>
              <CardDescription>
                Control how your data is used to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                  <div>
                    <h4 className="font-medium">Personalized Challenge Recommendations</h4>
                    <p className="text-xs text-muted-foreground">
                      Receive challenge suggestions based on your interests and activity
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.allowPersonalizedRecommendations}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowPersonalizedRecommendations: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                  <div>
                    <h4 className="font-medium">Anonymous Data Analysis</h4>
                    <p className="text-xs text-muted-foreground">
                      Allow Jillr to anonymously analyze your challenge performance
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.allowAnonymousDataAnalysis}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowAnonymousDataAnalysis: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                  <div>
                    <h4 className="font-medium">UGC Brand Challenges</h4>
                    <p className="text-xs text-muted-foreground">
                      Participate in user-generated content challenges with brands
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.allowUGCChallenges}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowUGCChallenges: checked})}
                  />
                </div>
                
                <Button className="w-full mt-2" onClick={() => handleSaveSettings('personalization')}>
                  Save Personalization Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-jillr-neonPink" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Control when and how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="email-notifs">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifs" 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="push-notifs">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications in your browser or app
                    </p>
                  </div>
                  <Switch 
                    id="push-notifs" 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Activity Notifications</h3>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="challenge-notifs">Challenge Updates</Label>
                    <p className="text-xs text-muted-foreground">
                      New challenges, deadlines, and results
                    </p>
                  </div>
                  <Switch 
                    id="challenge-notifs" 
                    checked={notifications.challengeUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, challengeUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="community-notifs">Community Interactions</Label>
                    <p className="text-xs text-muted-foreground">
                      Likes, comments, and mentions in posts
                    </p>
                  </div>
                  <Switch 
                    id="community-notifs" 
                    checked={notifications.communityInteractions}
                    onCheckedChange={(checked) => setNotifications({...notifications, communityInteractions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="follower-notifs">Follower Activity</Label>
                    <p className="text-xs text-muted-foreground">
                      New followers and follower interactions
                    </p>
                  </div>
                  <Switch 
                    id="follower-notifs" 
                    checked={notifications.followers}
                    onCheckedChange={(checked) => setNotifications({...notifications, followers: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="message-notifs">Messages</Label>
                    <p className="text-xs text-muted-foreground">
                      Direct messages and mentions
                    </p>
                  </div>
                  <Switch 
                    id="message-notifs" 
                    checked={notifications.messages}
                    onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="nearby-notifs">Live Events & Pop-Up Challenges</Label>
                    <p className="text-xs text-muted-foreground">
                      Notifications about events in your area
                    </p>
                  </div>
                  <Switch 
                    id="nearby-notifs" 
                    checked={notifications.nearbyEvents}
                    onCheckedChange={(checked) => setNotifications({...notifications, nearbyEvents: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="rewards-notifs">Expiring Rewards</Label>
                    <p className="text-xs text-muted-foreground">
                      Reminders for rewards and coins about to expire
                    </p>
                  </div>
                  <Switch 
                    id="rewards-notifs" 
                    checked={notifications.expiringRewards}
                    onCheckedChange={(checked) => setNotifications({...notifications, expiringRewards: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="vip-notifs">VIP & Brand Offers</Label>
                    <p className="text-xs text-muted-foreground">
                      Special brand opportunities and VIP invitations
                    </p>
                  </div>
                  <Switch 
                    id="vip-notifs" 
                    checked={notifications.vipOffers}
                    onCheckedChange={(checked) => setNotifications({...notifications, vipOffers: checked})}
                  />
                </div>
              </div>
              
              <div>
                <Button className="w-full" onClick={() => handleSaveSettings('notifications')}>
                  Save Notification Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-jillr-neonPurple" />
                Location Settings
              </CardTitle>
              <CardDescription>
                Control how Jillr uses your location data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Enable Location-Based Features</h4>
                  <p className="text-xs text-muted-foreground">
                    Use GPS for location-based challenges and Easter eggs
                  </p>
                </div>
                <Switch 
                  checked={locationSettings.locationEnabled}
                  onCheckedChange={(checked) => setLocationSettings({...locationSettings, locationEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Smart Displays & Digital Screens</h4>
                  <p className="text-xs text-muted-foreground">
                    Interact with smart city infrastructure for challenges
                  </p>
                </div>
                <Switch 
                  checked={locationSettings.useSmartDisplays}
                  onCheckedChange={(checked) => setLocationSettings({...locationSettings, useSmartDisplays: checked})}
                  disabled={!locationSettings.locationEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Easter Egg Reminders</h4>
                  <p className="text-xs text-muted-foreground">
                    Get notifications about nearby Easter eggs
                  </p>
                </div>
                <Switch 
                  checked={locationSettings.easterEggReminders}
                  onCheckedChange={(checked) => setLocationSettings({...locationSettings, easterEggReminders: checked})}
                  disabled={!locationSettings.locationEnabled}
                />
              </div>
              
              <Button 
                className="w-full mt-2" 
                onClick={() => handleSaveSettings('location')}
              >
                Save Location Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-jillr-neonBlue" />
                Location Privacy
              </CardTitle>
              <CardDescription>
                Control how your location data is used and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Location Precision</Label>
                <Select defaultValue="exact" disabled={!locationSettings.locationEnabled}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select precision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact Location</SelectItem>
                    <SelectItem value="approximate">Approximate (City Level)</SelectItem>
                    <SelectItem value="region">Region/Country Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Controls how precisely your location is tracked
                </p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Location History</h4>
                  <p className="text-xs text-muted-foreground">
                    Store history of challenges completed at different locations
                  </p>
                </div>
                <Switch defaultChecked disabled={!locationSettings.locationEnabled} />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Share With Brand Partners</h4>
                  <p className="text-xs text-muted-foreground">
                    Allow brands to see anonymized location data for challenges
                  </p>
                </div>
                <Switch defaultChecked={false} disabled={!locationSettings.locationEnabled} />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                disabled={!locationSettings.locationEnabled}
                onClick={() => {
                  toast({
                    title: "Location Data Cleared",
                    description: "Your location history has been successfully cleared.",
                  });
                }}
              >
                Clear Location History
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-jillr-neonGreen" />
                Location-Based Challenge Settings
              </CardTitle>
              <CardDescription>
                Control how you participate in location-based activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Challenge Radius</Label>
                    <Select defaultValue="medium" disabled={!locationSettings.locationEnabled}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1 km)</SelectItem>
                        <SelectItem value="medium">Medium (5 km)</SelectItem>
                        <SelectItem value="large">Large (25 km)</SelectItem>
                        <SelectItem value="any">Any Distance</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Maximum distance for nearby challenges
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Notification Distance</Label>
                    <Select defaultValue="medium" disabled={!locationSettings.locationEnabled}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Close (500m)</SelectItem>
                        <SelectItem value="medium">Medium (2 km)</SelectItem>
                        <SelectItem value="large">Far (10 km)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      When to notify about nearby challenges
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatic Check-ins</h4>
                    <p className="text-xs text-muted-foreground">
                      Automatically check in to locations when nearby
                    </p>
                  </div>
                  <Switch defaultChecked disabled={!locationSettings.locationEnabled} />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                  <div>
                    <h4 className="font-medium">Background Location</h4>
                    <p className="text-xs text-muted-foreground">
                      Allow app to track location when not in use
                    </p>
                  </div>
                  <Switch defaultChecked={false} disabled={!locationSettings.locationEnabled} />
                </div>
                
                <Button 
                  className="w-full mt-2" 
                  disabled={!locationSettings.locationEnabled}
                  onClick={() => handleSaveSettings('location challenge')}
                >
                  Save Challenge Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="advanced">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-jillr-neonPurple" />
                Device & Integration Settings
              </CardTitle>
              <CardDescription>
                Manage connected devices and third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Apple Health / Google Fit</h4>
                  <p className="text-xs text-muted-foreground">
                    Connect health data for fitness challenges
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Smartwatch Data</h4>
                  <p className="text-xs text-muted-foreground">
                    Use step count and activity data for challenges
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Smart Home Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    Connect smart home devices for sustainability challenges
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <Button className="w-full mt-2" onClick={() => handleSaveSettings('integration')}>
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-jillr-neonBlue" />
                API & Developer Settings
              </CardTitle>
              <CardDescription>
                Manage API connections and developer features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">TikTok API Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    Auto-upload challenges to TikTok
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">CapCut / Canva Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    Use templates for challenge content
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Shopify / Amazon Integration</h4>
                  <p className="text-xs text-muted-foreground">
                    Direct reward redemption through e-commerce
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <Button className="w-full mt-2" onClick={() => handleSaveSettings('API')}>
                Save API Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-jillr-neonGreen" />
                Account History & Security
              </CardTitle>
              <CardDescription>
                View account activity and manage security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Active Devices</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-jillr-neonPurple mr-3" />
                        <div>
                          <h4 className="font-medium">iPhone 15 Pro</h4>
                          <p className="text-xs text-muted-foreground">Berlin, Germany • Last active: Just now</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Current</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-jillr-darkBlue/10 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-jillr-neonBlue mr-3" />
                        <div>
                          <h4 className="font-medium">Chrome Browser • Windows</h4>
                          <p className="text-xs text-muted-foreground">Berlin, Germany • Last active: 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Log Out</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                  <div className="bg-jillr-darkBlue/10 rounded-lg p-3 text-sm space-y-3">
                    <div className="flex justify-between">
                      <span>Password changed</span>
                      <span className="text-muted-foreground">3 weeks ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New login from Chrome Browser</span>
                      <span className="text-muted-foreground">1 month ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email address updated</span>
                      <span className="text-muted-foreground">2 months ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-pause">Auto-Pause Account</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically pause account after 30 days of inactivity
                    </p>
                  </div>
                  <Switch id="auto-pause" defaultChecked={false} />
                </div>
                
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Data Exported",
                      description: "Your account data has been prepared for download.",
                    });
                  }}>
                    Export Account Data
                  </Button>
                  <Button variant="outline" className="w-full text-red-500 hover:bg-red-500/10 hover:text-red-500" onClick={() => {
                    toast({
                      title: "All Sessions Terminated",
                      description: "You have been logged out from all devices.",
                      variant: "destructive"
                    });
                  }}>
                    Log Out of All Devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileSettings;

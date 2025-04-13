
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
import { ChevronRight, Bell, Lock, PaintBucket, Tag, Globe, User, Mail, MessageSquare } from 'lucide-react';

interface ProfileSettingsProps {
  userProfile: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock data for settings - would come from database in real app
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    challenges: true,
    marketing: false,
    followers: true,
    messages: true
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    allowTagging: true,
    showLocation: false,
    contentVisibility: 'public'
  });
  
  const [preferences, setPreferences] = useState({
    categories: ['Fashion', 'Dance', 'Travel'],
    theme: 'dark',
    language: 'en'
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 w-full mb-6">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input id="phone" type="tel" placeholder="+49 123 4567890" />
              </div>
              <Button className="w-full">Update Account Information</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-jillr-neonBlue" />
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full">Change Password</Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-jillr-neonGreen" />
                Social Media Connections
              </CardTitle>
              <CardDescription>
                Link your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/20">
                    <div>
                      <h4 className="font-medium">TikTok</h4>
                      <p className="text-xs text-muted-foreground">Not Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/20">
                    <div>
                      <h4 className="font-medium">Instagram</h4>
                      <p className="text-xs text-muted-foreground">Not Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/20">
                    <div>
                      <h4 className="font-medium">YouTube</h4>
                      <p className="text-xs text-muted-foreground">Not Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/20">
                    <div>
                      <h4 className="font-medium">Twitter</h4>
                      <p className="text-xs text-muted-foreground">Not Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Connecting social accounts allows for cross-posting and enhanced discoverability.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
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
                  <Select defaultValue={privacy.profileVisibility}>
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
                  <Select defaultValue={privacy.contentVisibility}>
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
              </div>
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
                <Select defaultValue="followers">
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
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-jillr-neonGreen" />
                Messaging & Communication
              </CardTitle>
              <CardDescription>
                Control who can message and interact with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Who Can Message You</Label>
                  <Select defaultValue="followers">
                    <SelectTrigger>
                      <SelectValue placeholder="Select who can message you" />
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
                    <Label htmlFor="comments">Allow Comments on Content</Label>
                    <p className="text-xs text-muted-foreground">
                      Let others comment on your challenge uploads
                    </p>
                  </div>
                  <Switch id="comments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="read-receipts">Show Read Receipts</Label>
                    <p className="text-xs text-muted-foreground">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <Switch id="read-receipts" defaultChecked />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Blocked Users</h4>
                <div className="bg-jillr-darkBlue/20 rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">You haven't blocked any users.</p>
                </div>
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
                    checked={notifications.challenges}
                    onCheckedChange={(checked) => setNotifications({...notifications, challenges: checked})}
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
                    <Label htmlFor="marketing-notifs">Marketing & Promotions</Label>
                    <p className="text-xs text-muted-foreground">
                      Updates about offers and special events
                    </p>
                  </div>
                  <Switch 
                    id="marketing-notifs" 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>
              </div>
              
              <div>
                <Button className="w-full">Save Notification Preferences</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-jillr-neonPurple" />
                Content Preferences
              </CardTitle>
              <CardDescription>
                Personalize your content experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categories">Preferred Categories</Label>
                <div className="flex flex-wrap gap-2 py-2">
                  {preferences.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-jillr-darkBlue/20 hover:bg-jillr-darkBlue/40">
                      {category}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-transparent border-dashed cursor-pointer">
                    + Add Category
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  These preferences help personalize your feed and challenge recommendations
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Write a short bio about yourself..." 
                  className="resize-none min-h-24"
                />
                <p className="text-xs text-muted-foreground">
                  This helps others understand your content and interests
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaintBucket className="h-5 w-5 text-jillr-neonBlue" />
                Display Preferences
              </CardTitle>
              <CardDescription>
                Customize your app experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Interface Theme</Label>
                <Select defaultValue={preferences.theme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue={preferences.language}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion">Reduce Motion</Label>
                  <p className="text-xs text-muted-foreground">
                    Minimize animations throughout the app
                  </p>
                </div>
                <Switch id="reduce-motion" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-jillr-neonGreen" />
                Communication Preferences
              </CardTitle>
              <CardDescription>
                Control how we communicate with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Email Frequency</h3>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="important">Important Updates Only</SelectItem>
                      <SelectItem value="none">No Email Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-xs text-muted-foreground">
                      Special offers, promotions, and event updates
                    </p>
                  </div>
                  <Switch id="marketing-emails" defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-jillr-darkBlue/20">
                  <div>
                    <Label htmlFor="brand-updates">Brand Partner Updates</Label>
                    <p className="text-xs text-muted-foreground">
                      Updates and offers from our brand partners
                    </p>
                  </div>
                  <Switch id="brand-updates" defaultChecked={false} />
                </div>
                
                <Button className="w-full mt-4">Save Communication Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileSettings;

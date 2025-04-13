
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, MapPin } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: any;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, profileData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-4 border-2 border-jillr-neonPurple">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback>{profileData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="flex gap-2">
              <Upload size={14} /> Upload Image
            </Button>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={profileData.username} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" className="resize-none min-h-24" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" defaultValue={profileData.location} className="pl-10" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Social Media</Label>
              <div className="space-y-3">
                <Input placeholder="TikTok username" />
                <Input placeholder="Instagram username" />
                <Input placeholder="YouTube username" />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;

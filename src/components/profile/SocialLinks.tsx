
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  username: string;
}

const SocialLinks = () => {
  // Mock data for social links - would come from database in real app
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', name: 'TikTok', url: '#', username: '@jillruser' },
    { id: '2', name: 'Instagram', url: '#', username: '@jillr_user' },
    { id: '3', name: 'YouTube', url: '#', username: 'JillrCreator' },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLink, setNewLink] = useState<Partial<SocialLink>>({
    name: '',
    url: '',
    username: ''
  });

  const handleAddLink = () => {
    if (!newLink.name || !newLink.username) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }
    
    const url = newLink.url || `https://${newLink.name.toLowerCase()}.com/${newLink.username.replace('@', '')}`;
    
    const newSocialLink: SocialLink = {
      id: Date.now().toString(),
      name: newLink.name,
      url,
      username: newLink.username
    };
    
    setSocialLinks([...socialLinks, newSocialLink]);
    setNewLink({ name: '', url: '', username: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Link hinzugefügt",
      description: `${newLink.name} wurde zu deinen Social-Media-Links hinzugefügt.`
    });
  };
  
  const handleRemoveLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
    
    toast({
      title: "Link entfernt",
      description: "Der Social-Media-Link wurde entfernt."
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Social Media</h3>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((social) => (
          <div key={social.id} className="group relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-jillr-darkBlue/30 border-jillr-neonBlue/20 text-xs pr-8"
              asChild
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                {social.name}: {social.username}
                <ExternalLink size={12} className="absolute right-2" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => handleRemoveLink(social.id)}
            >
              <X size={10} />
            </Button>
          </div>
        ))}
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-dashed border-jillr-neonBlue/30 text-xs"
            >
              <Plus size={12} className="mr-1" /> Social Link hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Social Media Link hinzufügen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Plattform</Label>
                <Select
                  value={newLink.name}
                  onValueChange={(value) => setNewLink({...newLink, name: value})}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Wähle eine Plattform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Twitter">X (Twitter)</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitch">Twitch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input
                  id="username"
                  value={newLink.username}
                  onChange={(e) => setNewLink({...newLink, username: e.target.value})}
                  placeholder="@username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL (optional)</Label>
                <Input
                  id="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  placeholder="https://"
                />
                <p className="text-xs text-muted-foreground">
                  Wenn keine URL angegeben wird, wird eine Standard-URL basierend auf der Plattform und dem Benutzernamen erstellt.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Abbrechen</Button>
              <Button onClick={handleAddLink}>Hinzufügen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SocialLinks;

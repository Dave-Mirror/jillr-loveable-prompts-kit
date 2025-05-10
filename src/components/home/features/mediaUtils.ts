
import { toast } from 'sonner';

export const handleImageUpload = (
  index: number,
  features: any[],
  setFeatures: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const imageUrl = URL.createObjectURL(file);
      const updatedFeatures = [...features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        image: imageUrl
      };
      setFeatures(updatedFeatures);
      toast.success('Bild erfolgreich hochgeladen');
    }
  };
  input.click();
};

export const handleVideoUpload = (
  index: number,
  features: any[],
  setFeatures: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/*';
  input.onchange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      
      // Prüfe ob die Datei zu groß ist
      if (file.size > 50 * 1024 * 1024) { // 50MB Limit
        toast.error('Video ist zu groß. Maximum: 50MB');
        return;
      }
      
      const videoUrl = URL.createObjectURL(file);
      const updatedFeatures = [...features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        videoUrl: videoUrl
      };
      setFeatures(updatedFeatures);
      toast.success('Video erfolgreich hochgeladen');
    }
  };
  input.click();
};

// ============= Video Backfill Manager Component =============

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useVideoBackfill, BackfillProgress } from '@/utils/video/backfillPosters';
import { toast } from 'sonner';

interface VideoBackfillManagerProps {
  items: Array<{
    id: string;
    title: string;
    mediaType: string;
    mediaUrl: string;
    posterUrl?: string;
    thumbnailUrl?: string;
  }>;
  onUpdate?: () => void;
}

const VideoBackfillManager: React.FC<VideoBackfillManagerProps> = ({ 
  items, 
  onUpdate 
}) => {
  const { isRunning, progress, runBackfill } = useVideoBackfill();

  // Count video items that need poster generation
  const videoItemsNeedingPosters = items.filter(item => 
    item.mediaType === 'video' && 
    item.mediaUrl && 
    !item.posterUrl
  );

  const handleRunBackfill = async () => {
    if (items.length === 0) {
      toast.info('Keine Elemente zum Verarbeiten');
      return;
    }

    const updateCallback = async (id: string, posterUrl: string) => {
      // In a real app, this would update the database
      console.log(`Would update item ${id} with poster URL: ${posterUrl}`);
      
      // For demo purposes, update the item in memory
      const item = items.find(item => item.id === id);
      if (item) {
        item.posterUrl = posterUrl;
        item.thumbnailUrl = posterUrl;
      }
    };

    try {
      await runBackfill(items, updateCallback);
      onUpdate?.(); // Refresh parent component
    } catch (error) {
      console.error('Backfill failed:', error);
    }
  };

  const renderProgressBar = () => {
    if (!progress || !isRunning) return null;

    const percentage = (progress.completed / progress.total) * 100;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Fortschritt: {progress.completed}/{progress.total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <Progress value={percentage} className="w-full" />
        <div className="text-xs text-muted-foreground">
          Aktuell: {progress.currentItem}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!progress || isRunning) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <div className="text-sm">
            <div className="font-medium">{progress.created}</div>
            <div className="text-muted-foreground">Erstellt</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <div className="text-sm">
            <div className="font-medium">{progress.skipped}</div>
            <div className="text-muted-foreground">Übersprungen</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <div className="text-sm">
            <div className="font-medium">{progress.errors.length}</div>
            <div className="text-muted-foreground">Fehler</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-purple-500" />
          <div className="text-sm">
            <div className="font-medium">{progress.total}</div>
            <div className="text-muted-foreground">Gesamt</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Video Poster Backfill
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Videos gefunden: {items.filter(i => i.mediaType === 'video').length}</span>
          <span>Poster benötigt: {videoItemsNeedingPosters.length}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={videoItemsNeedingPosters.length > 0 ? "destructive" : "default"}>
            {videoItemsNeedingPosters.length} Videos ohne Poster
          </Badge>
          {items.filter(i => i.mediaType === 'video' && i.posterUrl).length > 0 && (
            <Badge variant="secondary">
              {items.filter(i => i.mediaType === 'video' && i.posterUrl).length} mit Poster
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleRunBackfill}
          disabled={isRunning || videoItemsNeedingPosters.length === 0}
          className="w-full"
        >
          {isRunning ? 'Poster werden generiert...' : 'Poster für alle Videos generieren'}
        </Button>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Results Summary */}
        {renderResults()}

        {/* Error List */}
        {progress && progress.errors.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Fehler beim Verarbeiten:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {progress.errors.map((error, index) => (
                <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  <strong>{error.id}:</strong> {error.error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded">
          <strong>Hinweis:</strong> Poster werden automatisch bei 2 Sekunden extrahiert. 
          Videos müssen zugänglich und kompatibel sein (MP4, WebM). 
          Prozess kann je nach Anzahl der Videos einige Minuten dauern.
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoBackfillManager;
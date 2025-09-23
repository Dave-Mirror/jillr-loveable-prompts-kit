// ============= Thumbnail Backfill Manager Component =============

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Image, Video, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { 
  getItemsNeedingThumbnails, 
  applyDefaultThumbnails, 
  normalizeMediaFields,
  type MediaItem 
} from '@/utils/media/thumbnailResolver';
import { 
  batchGeneratePosters, 
  createLocalUploadHandler 
} from '@/utils/video/posterGeneration';

interface ThumbnailBackfillManagerProps {
  items: MediaItem[];
  onUpdate?: (items: MediaItem[]) => void;
  title?: string;
}

interface BackfillProgress {
  total: number;
  completed: number;
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}

const ThumbnailBackfillManager: React.FC<ThumbnailBackfillManagerProps> = ({ 
  items, 
  onUpdate,
  title = "Backfill Missing Thumbnails"
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<BackfillProgress | null>(null);

  // Analyze current state
  const itemsNeedingThumbnails = getItemsNeedingThumbnails(items);
  const videoItemsNeedingPosters = items.filter(item => 
    normalizeMediaFields(item).mediaType === 'video' && !item.posterUrl
  );

  const handleBackfillThumbnails = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setProgress({
      total: itemsNeedingThumbnails.length,
      completed: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: []
    });

    try {
      let processedItems = [...items];
      let totalCreated = 0;
      let totalUpdated = 0;
      let totalErrors: string[] = [];

      // Step 1: Generate posters for videos
      if (videoItemsNeedingPosters.length > 0) {
        toast.info('Generiere Poster für Videos...');
        
        const uploadHandler = createLocalUploadHandler();
        const videoResults = await batchGeneratePosters(
          videoItemsNeedingPosters.map(item => ({
            id: item.id || '',
            videoUrl: item.mediaUrl || '',
            mediaType: item.mediaType || 'video'
          })),
          uploadHandler,
          (completed, total, currentItem) => {
            setProgress(prev => prev ? {
              ...prev,
              completed: completed,
              created: completed
            } : null);
          }
        );

        // Update items with generated posters
        videoResults.forEach(result => {
          if (result.posterUrl) {
            const itemIndex = processedItems.findIndex(item => item.id === result.id);
            if (itemIndex >= 0) {
              processedItems[itemIndex] = {
                ...processedItems[itemIndex],
                posterUrl: result.posterUrl,
                thumbnailUrl: processedItems[itemIndex].thumbnailUrl || result.posterUrl
              };
              totalCreated++;
            }
          } else if (result.error) {
            totalErrors.push(`${result.id}: ${result.error}`);
          }
        });
      }

      // Step 2: Apply category defaults for remaining items
      const remainingItems = getItemsNeedingThumbnails(processedItems);
      if (remainingItems.length > 0) {
        toast.info('Setze Standard-Thumbnails...');
        
        const { updated, count } = applyDefaultThumbnails(processedItems);
        processedItems = updated;
        totalUpdated = count;
      }

      // Final progress update
      setProgress({
        total: itemsNeedingThumbnails.length,
        completed: itemsNeedingThumbnails.length,
        created: totalCreated,
        updated: totalUpdated,
        skipped: items.length - itemsNeedingThumbnails.length,
        errors: totalErrors
      });

      // Notify parent component
      onUpdate?.(processedItems);

      // Show success message
      const successCount = totalCreated + totalUpdated;
      if (successCount > 0) {
        toast.success(`Backfill abgeschlossen: ${successCount} Thumbnails erstellt/aktualisiert`);
      } else {
        toast.info('Keine Thumbnails zum Aktualisieren gefunden');
      }

      if (totalErrors.length > 0) {
        toast.warning(`${totalErrors.length} Fehler bei der Verarbeitung`);
      }

    } catch (error) {
      console.error('Backfill failed:', error);
      toast.error('Backfill fehlgeschlagen');
      setProgress(prev => prev ? {
        ...prev,
        errors: [...prev.errors, `Unexpected error: ${error}`]
      } : null);
    } finally {
      setIsRunning(false);
    }
  };

  const renderProgressBar = () => {
    if (!progress || !isRunning) return null;

    const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Fortschritt: {progress.completed}/{progress.total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <Progress value={percentage} className="w-full" />
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
            <div className="text-muted-foreground">Poster generiert</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-blue-500" />
          <div className="text-sm">
            <div className="font-medium">{progress.updated}</div>
            <div className="text-muted-foreground">Defaults gesetzt</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-gray-500" />
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
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          {title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Items gesamt: {items.length}</span>
          <span>Benötigen Thumbnails: {itemsNeedingThumbnails.length}</span>
          <span>Videos ohne Poster: {videoItemsNeedingPosters.length}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={itemsNeedingThumbnails.length > 0 ? "destructive" : "default"}>
            {itemsNeedingThumbnails.length} benötigen Thumbnails
          </Badge>
          <Badge variant={videoItemsNeedingPosters.length > 0 ? "destructive" : "secondary"}>
            {videoItemsNeedingPosters.length} Videos ohne Poster
          </Badge>
          {items.filter(i => normalizeMediaFields(i).thumbnailUrl).length > 0 && (
            <Badge variant="secondary">
              {items.filter(i => normalizeMediaFields(i).thumbnailUrl).length} mit Thumbnails
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleBackfillThumbnails}
          disabled={isRunning || itemsNeedingThumbnails.length === 0}
          className="w-full"
        >
          {isRunning 
            ? 'Verarbeite Thumbnails...' 
            : `${itemsNeedingThumbnails.length} fehlende Thumbnails generieren`
          }
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
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Explanation */}
        <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded">
          <strong>Verarbeitung:</strong>
          <br />1. Videos: Poster aus Frame bei 2s generieren
          <br />2. Alle: Standard-Thumbnails basierend auf Titel/Kategorie setzen
          <br />3. Render: posterUrl → thumbnailUrl → categoryDefault → hologramFallback
        </div>
      </CardContent>
    </Card>
  );
};

export default ThumbnailBackfillManager;
// ============= Admin Video Manager Demo Page =============

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Image, Video, RefreshCw } from 'lucide-react';
import VideoBackfillManager from '@/components/admin/VideoBackfillManager';
import ThumbnailBackfillManager from '@/components/admin/ThumbnailBackfillManager';
import ChallengeCard from '@/components/ChallengeCard';
import { fetchFeedData } from '@/utils/challenge/feed';
import { motion } from 'framer-motion';

const AdminVideoManager: React.FC = () => {
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeedData = async () => {
    setLoading(true);
    try {
      const data = await fetchFeedData();
      setFeedItems(data);
    } catch (error) {
      console.error('Failed to load feed data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedData();
  }, []);

  // Convert feed items for backfill manager
  const backfillItems = feedItems.map(item => ({
    id: item.id,
    title: item.challengeInfo?.title || item.caption,
    mediaType: item.mediaType || 'image',
    mediaUrl: item.mediaUrl || '',
    posterUrl: item.posterUrl,
    thumbnailUrl: item.thumbnailUrl
  }));

  // Convert feed items to challenges for display
  const challenges = feedItems.map(item => ({
    id: item.id,
    slug: item.challengeId,
    title: item.challengeInfo?.title || item.caption,
    description: item.caption,
    type: item.category || 'challenge',
    category: item.category,
    xp: 300,
    tags: item.hashtags,
    mediaType: item.mediaType,
    mediaUrl: item.mediaUrl,
    posterUrl: item.posterUrl,
    thumbnailUrl: item.thumbnailUrl,
    imageUrl: item.mediaUrl,
    thumbnailAlt: `${item.challengeInfo?.title || item.caption} preview`,
    challengeId: item.challengeId
  }));

  const videoItems = challenges.filter(c => c.mediaType === 'video');
  const videoItemsWithPosters = videoItems.filter(c => c.posterUrl);
  const videoItemsNeedingPosters = videoItems.filter(c => !c.posterUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-jillr-darkBlue via-purple-900/80 to-pink-900/60 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">
            Video Poster Management
          </h1>
          <p className="text-white/80">
            Manage video thumbnails and poster frames for challenges
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Play className="h-8 w-8 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{feedItems.length}</div>
                  <div className="text-sm text-muted-foreground">Total Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Video className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{videoItems.length}</div>
                  <div className="text-sm text-muted-foreground">Video Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Image className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{videoItemsWithPosters.length}</div>
                  <div className="text-sm text-muted-foreground">With Posters</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-8 w-8 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">{videoItemsNeedingPosters.length}</div>
                  <div className="text-sm text-muted-foreground">Need Posters</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backfill Managers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VideoBackfillManager 
            items={backfillItems}
            onUpdate={loadFeedData}
          />
          <ThumbnailBackfillManager 
            items={backfillItems}
            onUpdate={(updatedItems) => {
              // Convert back to feed items
              const updatedFeedItems = feedItems.map(feedItem => {
                const updated = updatedItems.find(item => item.id === feedItem.id);
                return updated ? { ...feedItem, ...updated } : feedItem;
              });
              setFeedItems(updatedFeedItems);
            }}
            title="Backfill Missing Thumbnails"
          />
        </div>

        {/* Challenge Preview Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Challenge Preview Grid</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadFeedData}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading challenges...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {challenges.slice(0, 12).map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <ChallengeCard 
                        challenge={challenge}
                        size="default"
                        onClick={() => console.log('Clicked:', challenge.id)}
                      />
                      {/* Media type indicator */}
                      <div className="absolute -top-2 -right-2">
                        <Badge 
                          variant={challenge.mediaType === 'video' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {challenge.mediaType === 'video' ? (
                            <>
                              <Video className="h-3 w-3 mr-1" />
                              Video {challenge.posterUrl ? '✓' : '!'}
                            </>
                          ) : (
                            <>
                              <Image className="h-3 w-3 mr-1" />
                              Image
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Items Analysis */}
        {videoItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Video Items Detail Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videoItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded overflow-hidden bg-black/20 flex items-center justify-center">
                        {item.posterUrl || item.thumbnailUrl ? (
                          <img 
                            src={item.posterUrl || item.thumbnailUrl} 
                            alt="Poster"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Video className="h-4 w-4 text-white/60" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {item.id} • Type: {item.mediaType}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.posterUrl ? "default" : "destructive"}>
                        {item.posterUrl ? "Has Poster" : "No Poster"}
                      </Badge>
                      {item.mediaUrl && (
                        <Badge variant="outline">
                          Has Media URL
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminVideoManager;
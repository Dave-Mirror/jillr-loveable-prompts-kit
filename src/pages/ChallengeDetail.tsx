
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Upload, ExternalLink } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setChallenge(data);
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [id]);

  const handleJoinClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to join this challenge",
        variant: "destructive"
      });
      navigate('/auth', { state: { from: { pathname: `/challenge/${id}` } } });
      return;
    }
    
    navigate(`/upload/${id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Loading challenge details...</h1>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Challenge not found</h1>
          <p>The challenge you're looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="neon-card mb-8">
          <div className="neon-card-content p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-jillr-neonPurple/20 text-jillr-neonPurple mb-2">
                  {challenge.type || 'Challenge'}
                </span>
                <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Ends in:</span>
                <CountdownTimer endDate={challenge.end_date} />
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">{challenge.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {challenge.hashtags && challenge.hashtags.map((tag: string, index: number) => (
                <span key={index} className="px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 glassmorphism rounded-lg mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center p-2 rounded-lg bg-jillr-neonPurple/20">
                  <Zap size={24} className="text-jillr-neonPurple" />
                  <span className="ml-2 font-semibold">{challenge.xp_reward || 250} XP</span>
                </div>
                <div className="flex items-center p-2 rounded-lg bg-jillr-neonGreen/20">
                  <Clock size={24} className="text-jillr-neonGreen" />
                  <span className="ml-2 font-semibold">
                    {new Date(challenge.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <Button className="neon-button" onClick={handleJoinClick}>
                <Upload size={18} className="mr-2" />
                Join Challenge
              </Button>
            </div>
            
            <div className="bg-jillr-darkBlue/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">How to participate</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create your video using the suggested template or your own style</li>
                <li>Upload your content to TikTok using the challenge hashtags</li>
                <li>Submit your TikTok link and upload your video in the submission form</li>
                <li>Earn XP and coins immediately upon submission</li>
              </ol>
              
              <div className="mt-6 flex justify-end">
                <button
                  className="flex items-center text-jillr-neonPink hover:underline"
                  onClick={handleJoinClick}
                >
                  Go to submission page <ExternalLink size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;

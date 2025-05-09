
import { useMapBase } from './map/useMapBase';
import { useMarkerInteractions } from './map/useMarkerInteractions';
import { useItemDialog } from './map/useItemDialog';
import { useMapActions } from './map/useMapActions';

export function useMapInteractions() {
  const { 
    mapRef, 
    mapCenter, 
    onMapLoad, 
    onMapUnmount 
  } = useMapBase();

  const { 
    selectedMarker, 
    infoWindow, 
    handleMarkerClick,
    handleInfoWindowClose 
  } = useMarkerInteractions();

  const { 
    selectedItem, 
    isDetailsOpen, 
    handleItemClick, 
    handleCloseDialog 
  } = useItemDialog();

  const { 
    handleClaimReward,
    handleJoinEvent,
    handleJoinChallenge,
    handleTrackChallenge,
    handleScanQrCode,
    handleCollectEasterEgg 
  } = useMapActions();

  // Pass closure from handleCloseDialog into handleJoinChallenge
  const joinChallengeWithClose = (challengeId: string | undefined) => {
    if (challengeId) {
      const result = handleJoinChallenge(challengeId);
      if (result) {
        handleCloseDialog();
      }
    }
  };

  return {
    // Map base
    mapRef,
    mapCenter,
    onMapLoad,
    onMapUnmount,

    // Marker interactions
    selectedMarker,
    infoWindow,
    handleMarkerClick,
    handleInfoWindowClose,

    // Item dialog
    selectedItem,
    isDetailsOpen,
    handleItemClick,
    handleCloseDialog,

    // Map actions
    handleClaimReward,
    handleJoinEvent,
    handleJoinChallenge: joinChallengeWithClose,
    handleTrackChallenge,
    handleScanQrCode,
    handleCollectEasterEgg,
  };
}

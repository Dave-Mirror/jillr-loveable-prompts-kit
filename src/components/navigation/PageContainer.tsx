
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  enableSwipe?: boolean;
  previousPage?: string;
  nextPage?: string;
}

const routeOrder = ['/', '/explore', '/leaderboard', '/wallet', '/profile'];

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  enableSwipe = true,
  previousPage,
  nextPage
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [slideInitialized, setSlideInitialized] = useState(false);

  const currentIndex = routeOrder.indexOf(location.pathname);
  const hasPrevious = previousPage || currentIndex > 0;
  const hasNext = nextPage || currentIndex < routeOrder.length - 1 && currentIndex !== -1;

  const handleSwipe = (direction: 'next' | 'prev') => {
    if (direction === 'next' && hasNext) {
      if (nextPage) {
        navigate(nextPage);
      } else if (currentIndex !== -1) {
        navigate(routeOrder[currentIndex + 1]);
      }
    } else if (direction === 'prev' && hasPrevious) {
      if (previousPage) {
        navigate(previousPage);
      } else if (currentIndex !== -1) {
        navigate(routeOrder[currentIndex - 1]);
      }
    }
  };

  if (!enableSwipe || !isMobile) {
    return (
      <div className="page-container animate-fade-in pt-2 pb-20 md:pb-2 px-4 md:px-6 safe-area-left safe-area-right">
        {children}
      </div>
    );
  }

  return (
    <div className="page-container overflow-hidden safe-area-left safe-area-right">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={0}
        threshold={50}
        resistance={true}
        resistanceRatio={0.85}
        onSlideNextTransitionEnd={() => handleSwipe('next')}
        onSlidePrevTransitionEnd={() => handleSwipe('prev')}
        onSwiper={() => setSlideInitialized(true)}
        className="h-full w-full"
      >
        <SwiperSlide className="pt-2 pb-20 md:pb-2 px-4 md:px-6 animate-fade-in">
          {children}
        </SwiperSlide>
      </Swiper>
      
      {/* Navigation Hints */}
      {slideInitialized && (
        <>
          {hasPrevious && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 h-24 w-6 opacity-0">
              {/* This is a touch target for swiping */}
            </div>
          )}
          {hasNext && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-24 w-6 opacity-0">
              {/* This is a touch target for swiping */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PageContainer;

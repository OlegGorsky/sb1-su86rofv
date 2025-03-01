import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showCustomControls, setShowCustomControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const customMenuRef = useRef<HTMLDivElement>(null);

  // Preload video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "auto"; // Force preloading
      
      // Start loading the video data
      const handleCanPlayThrough = () => {
        setIsVideoLoaded(true);
      };
      
      videoRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Clean up
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
      };
    }
  }, []);

  useEffect(() => {
    // Initialize Telegram WebApp when component mounts
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Set header color using Telegram WebApp API
      if (window.Telegram.WebApp.setHeaderColor) {
        window.Telegram.WebApp.setHeaderColor('#4CAF50');
      }
    }

    // Add event listener to close custom menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (customMenuRef.current && !customMenuRef.current.contains(event.target as Node)) {
        setShowCustomControls(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openTelegramAccount = () => {
    window.open('https://t.me/Slim_for_life_robot', '_blank');
  };
  
  // Completely revised fullscreen implementation for Android compatibility
  const requestFullscreen = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    try {
      // Try multiple approaches for maximum compatibility
      if (isAndroid) {
        // Android-specific approaches
        if (typeof video.webkitEnterFullscreen === 'function') {
          video.webkitEnterFullscreen();
        } else if (typeof (video as any).webkitRequestFullScreen === 'function') {
          (video as any).webkitRequestFullScreen();
        } else if (typeof video.requestFullscreen === 'function') {
          video.requestFullscreen().catch(err => {
            console.log('Fallback to play method for fullscreen');
            // Sometimes playing the video helps trigger fullscreen controls
            video.play().catch(e => console.error('Play error:', e));
          });
        } else {
          // Last resort for older Android browsers
          const videoContainer = video.parentElement;
          if (videoContainer) {
            videoContainer.style.position = 'fixed';
            videoContainer.style.top = '0';
            videoContainer.style.left = '0';
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.style.zIndex = '9999';
            videoContainer.style.backgroundColor = '#000';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            
            // Add a close button
            const closeBtn = document.createElement('button');
            closeBtn.innerText = 'X';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '10px';
            closeBtn.style.zIndex = '10000';
            closeBtn.style.backgroundColor = 'rgba(0,0,0,0.5)';
            closeBtn.style.color = 'white';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '50%';
            closeBtn.style.width = '40px';
            closeBtn.style.height = '40px';
            closeBtn.style.fontSize = '20px';
            closeBtn.onclick = () => {
              videoContainer.style.position = '';
              videoContainer.style.top = '';
              videoContainer.style.left = '';
              videoContainer.style.width = '';
              videoContainer.style.height = '';
              videoContainer.style.zIndex = '';
              videoContainer.style.backgroundColor = '';
              video.style.width = '';
              video.style.height = '';
              video.style.objectFit = '';
              closeBtn.remove();
            };
            videoContainer.appendChild(closeBtn);
          }
        }
      } else {
        // Standard approach for other browsers
        if (typeof video.requestFullscreen === 'function') {
          video.requestFullscreen();
        } else if (typeof (video as any).webkitRequestFullscreen === 'function') {
          (video as any).webkitRequestFullscreen();
        } else if (typeof (video as any).mozRequestFullScreen === 'function') {
          (video as any).mozRequestFullScreen();
        } else if (typeof (video as any).msRequestFullscreen === 'function') {
          (video as any).msRequestFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      // Fallback to simple play
      video.play().catch(e => console.error("Play fallback error:", e));
    }
    
    // Close the custom controls menu
    setShowCustomControls(false);
  };

  // Toggle custom controls menu
  const toggleCustomControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCustomControls(!showCustomControls);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#232323] font-sans">
      {/* Telegram-style header with explicit styling */}
      <header 
        className="text-white p-4 text-center shadow-md bg-[#4CAF50]"
      >
        <h1 className="text-xl font-medium">Видео 1. Почему диеты никогда не сработают?</h1>
      </header>

      <main className="max-w-md mx-auto p-5">
        {/* Introduction - Highlighted */}
        <section className="mb-6">
          <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#FF9800]/10 p-5 rounded-lg border-l-4 border-[#FF9800] shadow-sm">
            <p className="text-lg font-medium text-[#232323]">
              Если вы здесь, то вам скорее всего уже надоело бесконечно бороться с весом и хочется найти работающий метод, правда?
            </p>
          </div>
          
          <h2 className="text-xl font-bold mt-5 mb-2">Как это сделать?</h2>
          <p className="text-lg font-medium">
            Первый шаг — выбрать правильный подход.
          </p>
        </section>

        {/* Main content */}
        <section className="mb-6 bg-white rounded-lg p-5 shadow-sm">
          <p className="mb-4">
            В нашей работе мы используем метод баланса вместо диет. А знаете, что это значит?
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#FF9800] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-1">1</div>
              <p>
                Вам нужно всего 15-20 минут в день на заботу о себе. Найти это время сможет и мама с грудничком, и занятая бизнес леди, ведь речь о вашем теле и здоровье, правда?
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#FF9800] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-1">2</div>
              <p>
                Здесь не будет никаких запретов в еде! Да, не надо убирать с рациона ни хлебобулочные, ни сладкие, ни глютен.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#FF9800] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-1">3</div>
              <p>
                Каждую калорию, каждый грамм еды считать тоже не придется, а то такие скрупулезные подсчеты – это прямая дорога к тревожности, а не стройности!
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-8">
          <p className="mb-4">
            Вы научитесь осознанно относиться к своему питанию и слышать свой организм – это и станет главным секретом вашей красоты.
          </p>
          <p className="mb-4">
            Вы поймете, что именно мешает вам похудеть, и получите персональные рекомендации по питанию и образу жизни. А значит - сделаете первый шаг к красивому телу и гармоничным отношениям с едой.
          </p>
        </section>

        {/* Video section */}
        <section className="mb-6">
          <div 
            className="relative rounded-lg overflow-hidden shadow-xl video-container"
            style={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              maxWidth: '100%'
            }}
            id="videoContainer"
          >
            <video 
              ref={videoRef}
              className="w-full" 
              controls
              poster="https://files.salebot.pro/uploads/file_item/42372317/file/518657/16-2.jpg"
              preload="auto"
              playsInline
              controlsList="nodownload"
              webkit-playsinline="true"
              x-webkit-airplay="allow"
            >
              <source src="https://files.salebot.pro/uploads/file_item/file/518657/первое_правки.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            {!isVideoLoaded && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div className="h-full bg-[#FF9800] animate-pulse" style={{ width: '100%' }}></div>
              </div>
            )}
            
            {/* Custom video controls overlay */}
            <div className="absolute top-0 right-0 p-2">
              <button 
                onClick={toggleCustomControls}
                className="bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {showCustomControls && (
                <div 
                  ref={customMenuRef}
                  className="absolute top-10 right-2 bg-white shadow-lg rounded-md py-1 z-10"
                  style={{ minWidth: '150px' }}
                >
                  <button 
                    onClick={requestFullscreen}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                      <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                    </svg>
                    Развернуть
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="mt-6 mb-10">
          <button 
            className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-black font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
            onClick={openTelegramAccount}
          >
            Смотреть следующий урок
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
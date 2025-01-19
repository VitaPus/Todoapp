import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = React.useRef(null); // Используем useRef для хранения идентификатора таймера

  useEffect(() => {
    // Запускаем таймер, если он запущен
    if (isRunning) {
      startTimer();
    }
    // Очищаем таймер при размонтировании компонента
    return () => stopTimer();
  }, [isRunning]);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000); // обновление каждую секунду
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const handlePlayPause = () => {
    setIsRunning(prevIsRunning => {
      if (prevIsRunning) {
        stopTimer();
      } else {
        startTimer();
      }
      return !prevIsRunning;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer">
      <button
        className={`icon-${isRunning ? 'pause' : 'play'}`}
        onClick={handlePlayPause}
        aria-label={isRunning ? 'Pause' : 'Play'}
      >
        {isRunning ? (
          <span></span> // Кнопка для паузы
        ) : (
          <span></span> // Кнопка для воспроизведения
        )}
      </button>
      <div>{formatTime(seconds)}</div> {/* Форматируем время в минуты и секунды */}
    </div>
  );
};

export default Timer;
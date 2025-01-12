import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isRunning: false,
    };
    this.timerId = null; // Уникальный идентификатор таймера
  }

  componentDidMount() {
    // Запуск таймера при монтировании, если он запущен
    if (this.state.isRunning) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    // Остановить таймер при размонтировании компонента
    this.stopTimer();
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    }, 1000); // обновление каждую секунду
  }

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  handlePlayPause = () => {
    this.setState((prevState) => {
      if (prevState.isRunning) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return { isRunning: !prevState.isRunning };
    });
  }

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  render() {
    const { isRunning, seconds } = this.state;

    return (
      <div className="timer">
        <button
          className={`icon-${isRunning ? 'pause' : 'play'}`}
          onClick={this.handlePlayPause}
          aria-label={isRunning ? 'Pause' : 'Play'}
        >
          {isRunning ? (
            <span></span> // Кнопка для паузы
          ) : (
            <span></span> // Кнопка для воспроизведения
          )}
        </button>
        <div>{this.formatTime(seconds)}</div> {/* Форматируем время в минуту и секунды */}
      </div>
    );
  }
}
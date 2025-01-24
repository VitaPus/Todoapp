import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.timeInSeconds(props.initialTime),
      isRunning: false,
    };
    this.timerId = null;
  }

  componentDidUpdate(prevProps) {
    // Если новое время отличается от предыдущего, нужно сбросить таймер
    if (prevProps.initialTime !== this.props.initialTime) {
      this.setState({ seconds: this.timeInSeconds(this.props.initialTime) });
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  timeInSeconds = (time) => {
    if (!time) {
      console.error("Received undefined or empty time");
      return 0;  // Возвращаем 0 если time не определено
    }
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes || 0) * 60 + (seconds || 0);
  };

  startTimer = () => {
    this.setState({ isRunning: true });
    this.timerId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.seconds <= 0) {
          clearInterval(this.timerId);
          return { isRunning: false }; // Остановить таймер по окончании
        }
        return { seconds: prevState.seconds - 1 };
      });
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
    this.setState({ isRunning: false });
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
          {isRunning ? '' : ''}
        </button>
        <div>{this.formatTime(seconds)}</div>
      </div>
    );
  }
}
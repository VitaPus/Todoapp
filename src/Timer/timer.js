import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.timeInSeconds(props.initialTime),
      isRunning: this.props.isRunning, // Локальное управление isRunning
    };
    this.timerId = null;
  }

  componentDidMount() {
    if (this.state.isRunning) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isRunning !== this.props.isRunning) {
      this.setState({ isRunning: this.props.isRunning }, () => {
        if (this.state.isRunning) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      });
    }

    if (prevProps.initialTime !== this.props.initialTime) {
      this.setState({ seconds: this.timeInSeconds(this.props.initialTime) });
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  timeInSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes || 0) * 60 + (seconds || 0);
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  startTimer = () => {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.setState(
        (prevState) => ({ seconds: prevState.seconds - 1 }),
        () => {
          if (this.state.seconds <= 0) {
            this.stopTimer();
          } else {
            this.props.onTimeUpdate(this.formatTime(this.state.seconds));
          }
        }
      );
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  };

  handlePlayPause = () => {
    this.setState(
      (prevState) => ({ isRunning: !prevState.isRunning }),
      () => {
        if (this.state.isRunning) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    );
  };

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

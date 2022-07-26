import React from 'react';
import './App.css';
import alarm from './assets/alarm.mp3';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      breaklength: 5, 
      sessionlength: 25, 
      sessiontrue: true,
      paused: true,
      timerseconds: 0,
      timerminutes: 25,
      interval: "",
    }
    this.breakinc = this.breakinc.bind(this);
    this.breakdec = this.breakdec.bind(this);
    this.sessioninc = this.sessioninc.bind(this);
    this.sessiondec = this.sessiondec.bind(this);
    this.startstop = this.startstop.bind(this);
    this.countdown = this.countdown.bind(this);
    this.convertminutes = this.convertminutes.bind(this);
    this.convertseconds = this.convertseconds.bind(this);
    this.convertsessionstate = this.convertsessionstate.bind(this);
    this.intervalsetter = this.intervalsetter.bind(this);
    this.reset = this.reset.bind(this);
  }
  breakinc() {
    if(this.state.breaklength<60 && this.state.paused){
      this.setState({
        breaklength: this.state.breaklength + 1,
      })
    }
  }

  breakdec() {
    if(this.state.breaklength>1 && this.state.paused){
      this.setState({
        breaklength: this.state.breaklength - 1,
      })
    }
  }

  sessioninc() {
    if(this.state.sessionlength<60 && this.state.paused){
      this.setState({
        sessionlength: this.state.sessionlength + 1,
        timerminutes: this.state.timerminutes + 1
      })
    }
  }

  sessiondec() {
    if(this.state.sessionlength>1 && this.state.paused){
      this.setState({
        sessionlength: this.state.sessionlength - 1,
        timerminutes: this.state.timerminutes - 1
      })
    }
  }

  startstop() {
    if (this.state.paused){
      this.setState({
        paused: false,
      });
      this.countdown(false);
    } else if (!this.state.paused){
      this.setState({
        paused: true,
      });
      this.countdown(true);
    }
  }

 countdown(paused){
  if (paused){
    clearInterval(this.state.interval);
    this.setState({
      interval: ""
    })
  } else {
    this.intervalsetter();
  }
}

intervalsetter(){
  this.setState({
    interval: setInterval(() => {
        
      if (this.state.timerseconds === 0 && this.state.timerminutes > 0){
        this.setState({
          timerseconds: 59,
          timerminutes: this.state.timerminutes - 1
        })
      } else if (this.state.timerseconds > 0 && this.state.timerminutes >= 0) {
        this.setState({
          timerseconds: this.state.timerseconds - 1,
          timerminutes: this.state.timerminutes
        })
        
      } else if (this.state.timerseconds === 0 && this.state.timerminutes === 0){
        if (this.state.sessiontrue){
          //clearInterval(this.state.interval);
          document.getElementById("beep").play();
          this.setState({
            timerseconds: 0,
            timerminutes: this.state.breaklength,
            sessiontrue: false,
          });
         // this.countdown(this.state.timerseconds, this.state.timerminutes, this.state.sessiontrue, false);
        } else {
          //clearInterval(this.state.interval);
          document.getElementById("beep").play();
          this.setState({
            timerseconds: 0, 
            timerminutes: this.state.sessionlength,
            sessiontrue: true,
          });
          //this.countdown(this.state.timerseconds, this.state.timerminutes, this.state.sessiontrue, false)
        }
      }
    }
  
, 1000),
  })
}

  reset(){
    if (!this.state.paused){
      clearInterval(this.state.interval);
      this.setState({
        paused: true,
      });
   }
   this.setState({
    timerseconds: 0,
    timerminutes: 25,
    sessionlength: 25,
    breaklength: 5,
    sessiontrue: true,
  })
  document.getElementById("beep").pause();
  document.getElementById("beep").currentTime = 0;
  }

  convertminutes(minutes){
    if (minutes<10){
      return "0" + minutes.toString();
    } else {
      return minutes.toString();
    }
  }

  convertseconds(seconds){
    if(seconds<10){
      return "0" + seconds.toString();
    } else {
      return seconds.toString();
    }
  }

  convertsessionstate(sessionstate){
    if (sessionstate){
      return "Session"
    } else {
      return "Break"
    }
  }

  render() {
    return (
      <div id="container">
        <h1 id="title">25 + 5 Clock</h1>
        <div id="lengthcontainer">
          <div id="breaklengthcontainer">
        <h2 id="break-label">Break Length</h2>
          <div id="break-length">{this.state.breaklength}:00</div>
          <button id="break-increment" onClick={this.breakinc}>^</button>
          <button id="break-decrement" onClick={this.breakdec}>v</button>
          </div>
          <div id="sessionlengthcontainer">
            <h2 id="session-label">Session Length</h2>
            <div id="session-length">{this.state.sessionlength}:00</div>
            <button id="session-increment" onClick={this.sessioninc}>^</button>
            <button id="session-decrement" onClick={this.sessiondec}>v</button>
          </div>
          <div id="timercontainer">
            <h2 id="timer-label">{this.convertsessionstate(this.state.sessiontrue)}</h2>
            <div id="time-left">{this.convertminutes(this.state.timerminutes)}:{this.convertseconds(this.state.timerseconds)}</div>
            <button id="start_stop" onClick={this.startstop}>Start/Stop</button>
            <button id="reset" onClick={this.reset}>Reset</button>
            <audio id="beep" controls={true} src={alarm} style={{display:"none"}}></audio>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
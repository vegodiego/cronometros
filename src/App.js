import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.timerID = undefined
    this.change1 = this.change1.bind(this)
    this.change2 = this.change2.bind(this)
    this.cancelSubmit = this.cancelSubmit.bind(this)
    this.update = this.update.bind(this)
    this.updateOk = this.updateOk.bind(this)
    this.updateCancel = this.updateCancel.bind(this)
    this.delete = this.delete.bind(this)
    this.new = this.new.bind(this)
    this.newCancel = this.newCancel.bind(this)
    this.newOk = this.newOk.bind(this)
    this.addTime = this.addTime.bind(this)
    this.stop = this.stop.bind(this)
    this.pad = this.pad.bind(this)
    this.millisecondsToHuman = this.millisecondsToHuman.bind(this)
    this.state = {
      timers: [{id:1, run:false, title:"Estudiando Ruby", project:"Ruby",cronom: this.timerID, elapsedTime:"00:00:00", time:0, timerVisibility:true},{id:2, run:false, title:"Estudiando Javascript", project:"Javascript",cronom: this.timerID, elapsedTime:"00:00:00", time:0, timerVisibility:true}],
      new: false,
      title: "",
      project: "",
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="text-center">Timers</h1>
          <hr />
        </div>
        <div>

          {this.state.timers.map((timer,index) =>
            <div>
              <div className={timer.timerVisibility === true ? "card": "card d-none"}>
                <div className="card-body">
                  <h5>{timer.title}</h5>
                  <div className="text-secondary small">{timer.project}</div>
                  <br />
                  <h3 className="text-center">{timer.elapsedTime}</h3>
                  <div className="d-flex flex-row-reverse justify-content-between">
                    <FontAwesomeIcon onClick={() => this.delete(timer.id)} icon={faTrashAlt} size="xs" />
                    <FontAwesomeIcon onClick={() => this.update(timer.id)} icon={faEdit} size="xs" />
                  </div>
                </div>
                <div>
                  <button type="button" onClick={() => this.addTime(timer.id)} className = {timer.run === false ? "btn btn-outline-success btn-block" : "d-none"}>Start</button>
                  <button type="button" onClick={() => this.stop(timer.id)} className = {timer.run === false ? "d-none" : "btn btn-outline-danger btn-block"}>Stop</button> 
                </div>   
              </div>

              <div className={timer.timerVisibility === true ? "card d-none": "card"}>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="title">Title:</label>
                      <input type="text" defaultValue={timer.title} onChange={this.change1} className="form-control" id="title" />
                    </div>
                    <div className="form-group">
                      <label for="project">Project:</label>
                      <input type="text" defaultValue={timer.project} onChange={this.change2} className="form-control" id="project" />
                    </div>
                  </form>
                </div>
                <div className="btn-group">
                  <button type="button" onClick={() => this.updateOk(timer.id)} className="btn btn-outline-info">Update</button>
                  <button type="button" onClick={() => this.updateCancel(timer.id)} className="btn btn-outline-danger">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className={this.state.new === true ? "card": "card d-none"}>
            <div className="card-body">
              <form onSubmit={this.cancelSubmit}>
                <div className="form-group">
                  <label for="title">Title:</label>
                  <input type="text" value={this.state.title} onChange={this.change1} className="form-control" id="title" />
                </div>
                <div className="form-group">
                  <label for="project">Project:</label>
                  <input type="text" value={this.state.project} onChange={this.change2} className="form-control" id="project" />
                </div>
              </form>
            </div>
            <div className="btn-group">
              <button type="button" onClick={this.newOk} className="btn btn-outline-info">Create</button>
              <button type="button" onClick={this.newCancel} className="btn btn-outline-danger">Cancel</button>
            </div>
          </div>

          <div className={this.state.new === true ? "text-center d-none": "text-center"}>
            <FontAwesomeIcon onClick={this.new} icon={faPlusSquare} size="2x" />
          </div>
          <br />

        </div>
      </div>
    );
  }

  change1(event){
    this.setState({
      title: event.target.value
    })
  }

  change2(event){
    this.setState({
      project: event.target.value
    })
  }

  cancelSubmit(event){
    event.preventDefault();
  }

  update(timerId){
    var timers=[];
    for (var i = 0; i< this.state.timers.length; i++) {
      if(this.state.timers[i].id === timerId){
        this.state.timers[i].timerVisibility = false;
        timers.push(this.state.timers[i]);
      }
      else{
        timers.push(this.state.timers[i]);
      }
    }
    this.setState({
      timers: timers
    });
  }

  updateCancel(timerId){
    var timers=[];
    for (var i = 0; i< this.state.timers.length; i++) {
      if(this.state.timers[i].id === timerId){
        this.state.timers[i].timerVisibility = true;
        timers.push(this.state.timers[i]);
      }
      else{
        timers.push(this.state.timers[i]);
      }
    }
    this.setState({
      timers: timers
    });
  }

  updateOk(timerId){
    var timers=[];
    for (var i = 0; i< this.state.timers.length; i++) {
      if(this.state.timers[i].id === timerId){
        if(this.state.title===""){
        }
        else{
          this.state.timers[i].title = this.state.title;
        }
        if(this.state.project===""){
        }
        else{
          this.state.timers[i].project = this.state.project;
        }
        this.state.timers[i].timerVisibility = true;
        timers.push(this.state.timers[i]);
      }
      else{
        timers.push(this.state.timers[i]);
      }
    }
    this.setState({
      timers: timers
    });
  }

  delete(timerId){
    const timer = this.state.timers;
    const index = parseInt(timerId);
    this.setState({
      timers: timer.filter((i) =>
        index !== i.id
      )
    });
  }

  new(){
    this.setState({
      new: true
    });
  }

  newCancel(){
    this.setState({
      new: false
    });
  }

  newOk(){

    var newTitle="";
    var newProject="";

    if(this.state.title === ""){
      newTitle = "Timer";
    }
    else{
      newTitle = this.state.title;
    }
    if(this.state.project === ""){
      newProject = "Project";
    }
    else{
      newProject = this.state.project;
    }

    var timers=this.state.timers;
    timers.push({id:this.state.timers.length+1, run:false, title: newTitle, project: newProject , elapsedTime:"00:00:00", time: 0, timerVisibility:true})

    this.setState({
      timers: timers, 
      new: false,
      title: "",
      project: ""
    });
  }

  addTime(timerId) {
    var timers=[];
    for (var i = 0; i< this.state.timers.length; i++) {
      if(this.state.timers[i].id === timerId){
        this.state.timers[i].run = true;
        this.state.timers[i].cronom = setInterval(() => this.tick(timerId),1000);
        timers.push(this.state.timers[i]);
      }
      else{
        timers.push(this.state.timers[i]);
      }
    }
    this.setState({
      timers: timers
    });
  }

  tick(timerId) {
    var oldTimers=this.state.timers;
    for (var i = 0; i< oldTimers.length; i++) {
      if(oldTimers[i].id === timerId){
        oldTimers[i].time+=1000;
        oldTimers[i].elapsedTime = this.millisecondsToHuman(oldTimers[i].time); 
      }
    }  
    this.setState({
      timer: oldTimers
    });
  }

  stop(timerId) {
    var timers=[];
    for (var i = 0; i< this.state.timers.length; i++) {
      if(this.state.timers[i].id === timerId){
        this.state.timers[i].run = false;
        clearInterval(this.state.timers[i].cronom);       
        timers.push(this.state.timers[i]);
      }
      else{
        timers.push(this.state.timers[i]);
      }
    }
    this.setState({
      timers: timers
    });
  }

  pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      this.pad(hours.toString(), 2),
      this.pad(minutes.toString(), 2),
      this.pad(seconds.toString(), 2),
    ].join(':')
    return humanized;
  }
}


export default App;

import React, { Component } from 'react';
import './Clock.css';


class Clock extends Component {
    constructor(props){
        super(props)
        this.state = {d: new Date()}
    }
    componentDidMount() {
        this.timeID = setInterval(
            () => this.Change(),
            1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    Change = () => {
        this.setState({
            d : new Date(),
        })
    }

    addZeros(n) {
      if(n < 10) {
        return "0"+n;
      }
      return n;
    }
    render() {
      const currentDate = this.state.d;
      const week = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
      var date = currentDate.getFullYear()+'/'+currentDate.getMonth()+'/'+currentDate.getDate()+" "+week[currentDate.getDay()];
      var amPm = ' AM'; // 초기값 AM
      var currentHours = this.addZeros(currentDate.getHours()); 
      var currentMinute = this.addZeros(currentDate.getMinutes());
      var currentSeconds = this.addZeros(currentDate.getSeconds());
      
      if(currentHours >= 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
        amPm = ' PM';
        currentHours = this.addZeros(currentHours - 12);
      }
  
      if(currentSeconds >= 50){// 50초 이상일 때 색을 변환해 준다.
         currentSeconds = <span color="#de1951">{currentSeconds}</span>;
      }
      return(
          <div className ="Clock-layout">
            <div className="Clock-date">{date}</div>
            <span className="Clock-time">
              {currentHours}:{currentMinute}:{currentSeconds}
              <span className="Clock-ampm">{amPm}</span>
            </span>
            

          </div>)
    }
}

export default Clock;
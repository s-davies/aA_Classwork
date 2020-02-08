class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
   let time = new Date();

   this.hours = time.getHours();
   this.minutes = time.getMinutes();
   this.seconds = time.getSeconds();
   this.printTime();
   setInterval(this._tick.bind(this), 1000);

   
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    let formatted = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(formatted); 

  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    if (this.seconds < 59){
      this.seconds++;
    } else {
      this.seconds = 0;
    }


    if (this.minutes === 59 && this.seconds === 0) {
      this.minutes = 0;
    } else if (this.minutes < 59 && this.seconds === 0){
      this.minutes++;
    }

    if (this.hours === 23 && this.minutes === 0 && this.seconds === 0) {
      this.hours = 0;
    } else if (this.hours < 23 && this.minutes === 0 && this.seconds === 0) {
      this.hours++;
    }
    this.printTime();
  }
}

const clock = new Clock();


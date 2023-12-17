class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timer = container.querySelector('.time');
    this.intervalId = null;

    this.reset();
    this.registerEvents();
  }

  setTime(hours, minutes, seconds){
    let time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);
    return time;    
  }
  
  getTime(time){
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if(hours < 10){
        hours = `0${hours}`;
    }
    if(minutes < 10){
        minutes = `0${minutes}`; 
    }
    if(seconds < 10){
        seconds = `0${seconds}`; 
    }
    this.timer.textContent = "";
    this.timer.textContent = `${hours}:${minutes}:${seconds}`;
}

countDown(time){
  time.setSeconds(time.getSeconds()-1);
  if(time.getSeconds < 0){
      time.setMinutes(time.getMinutes()-1);
      if(time.getMinutes < 0){
          time.setHours(time.getHours()-1);
      }
  }
  return time;
}
  startTime(){
    if(this.intervalId !== null){
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    let time = this.setTime(0, 0, this.wordElement.textContent.length);
    this.getTime(time);
    this.intervalId = setInterval(() => {
      this.countDown(time);
      this.getTime(time);
      if(this.timer.textContent === "00:00:00"){
        clearInterval(this.intervalId);
        this.fail();
      }
    }, 1000);
  }
  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    document.addEventListener("keydown", (event) => {
      if(event.key === "Shift" || event.key === "Alt"){
        return;
      }
      if(this.currentSymbol.textContent === event.key.toLowerCase() && this.timer.textContent !== "00:00:00"){
        this.success();
      }
      else{
        this.fail();
      }
    }); 
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.startTime();
  }

  getWord() {
    const words = [
        'bob крутой парень',
        'awesome задача',
        'netology крутое место for studying',
        'hello всем',
        'kitty',
        'synthwave фанатам of ryan gosling',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript is крутой язык программирования'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}
new Game(document.getElementById('game'))


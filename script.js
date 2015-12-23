dots(2);

function dots(num, turnColors){
  var turn = 0;
  var dotsEl = document.querySelector(".dots");
  dotsEl.setAttribute("data-turn",turn);
  for(var i = 0; i < num * num; i++){
    var square = document.createElement("div");
    square.setAttribute("data-square", i);
    square.classList.add("square");
    for(var j = 0; j < 4; j++){
      var line = document.createElement("div");
      line.classList.add("line");
      if(j === 2 && !((i + 1) % (num ) === 0) ){
         line.addEventListener("click", onRightLineClick); 
      } else if(j === 3 && i < (num * num) - num ){ 
         line.addEventListener("click", onBottomLineClick); 
      } else { 
         line.addEventListener("click", onLineClick);
      }
      square.appendChild(line);
    }
    if( i % num === 0)
      square.classList.add("cb");
    dotsEl.appendChild(square); 
  } 
  function onLineClick(event){
    setActive(event.target);
    toggleTurn()
  }
  function toggleTurn(){
    turn = turn == 0 ? 1 : 0; 
    dotsEl.setAttribute("data-turn", turn);
  }
  function setActive(el){
    el.classList.add("active");
    el.setAttribute("data-turn", turn);
    var square = el.parentNode;
    if(square.querySelectorAll(".active").length == 4){
      square.classList.add("active")
      square.setAttribute("data-turn", turn)
    }
  }
  function onRightLineClick(event){
    var line = this.parentNode.nextSibling.querySelector(".line:nth-child(2)");
    setActive(line);
    onLineClick(event);
  }
  function onBottomLineClick(event){ 
    var index = num + 1 + parseInt(event.target.parentNode.getAttribute("data-square"));
    var sibling = document.querySelector("[data-square]:nth-of-type("+index+")");
    setActive(sibling.querySelector(".line:nth-child(1)"));
    onLineClick(event);
  }
}
dots(3);

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
      if(j === 1 && i % num !== 0){
	line.addEventListener("click", onLeftLineClick);
      } else if(j === 2 && !((i + 1) % num === 0) ){
         line.addEventListener("click", onRightLineClick); 
      } else if(j === 3 && i < (num * num) - num ){ 
         line.addEventListener("click", onBottomLineClick); 
      } else if(j === 0 && i + 1 > num){ 
         line.addEventListener("click", onTopLineClick); 
      } else { 
         line.addEventListener("click", function(event){
	   onLineClick(event.target);
	 });
      }
      square.appendChild(line);
    }
    if(i % num === 0)
      square.classList.add("cb");
    dotsEl.appendChild(square); 
  } 
  function setActive(el){
    el.classList.add("active");
    var square = el.parentNode;
    if(square.querySelectorAll(".active").length == 4){
      square.classList.add("active")
      square.setAttribute("data-turn", turn)
    } 
    el.setAttribute("data-turn", turn);
  }
  function onLineClick(target){
    setActive(target);
    //toggleTurn(target, target)
  }
  function toggleTurn(el1, el2){
    turn = turn == 0 ? 1 : 0; 
    dotsEl.setAttribute("data-turn", turn);
  }
  function placeHolder(el1, el2){
    setActive(el1)
    setActive(el2)
    //toggleTurn(el1, el2);
  }
  function onRightLineClick(event){
    var line = this.parentNode.nextSibling.querySelector(".line:nth-child(2)");
    placeHolder(event.target, line)
  }
  function onLeftLineClick(event){
    var line = this.parentNode.previousSibling.querySelector(".line:nth-child(3)");
    placeHolder(event.target, line)
  }
  function onTopLineClick(event){ 
    var index = parseInt(event.target.parentNode.getAttribute("data-square")) - num;
    var sibling = document.querySelector("[data-square]:nth-of-type("+ ++index+")");
    var line = sibling.querySelector(".line:nth-child(4)");
    placeHolder(event.target, line)
  }
  function onBottomLineClick(event){ 
    var index = num + 1 + parseInt(event.target.parentNode.getAttribute("data-square"));
    var sibling = document.querySelector("[data-square]:nth-of-type("+index+")");
    var line = sibling.querySelector(".line:nth-child(1)");
    placeHolder(event.target, line)
  }
}
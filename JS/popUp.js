// Get the modal
var modal = document.getElementById("myModal");
let count=0;
// Get the button that opens the modal
var btn = document.getElementById("pacman");
let p =document.querySelectorAll("p")
let one=document.getElementById("one");
let two=document.getElementById("two");
let three=document.getElementById("three");
let nextBtn=document.getElementById("next")
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  p.forEach(function(item){
    item.style.display = "none"
  })
  modal.style.display = "block";
  one.style.display = "block";
  nextBtn.style.display = "block";
  count=0;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function nextFunction(){
  count++;
  p.forEach(function(item){
    item.style.display = "none"
  })
  if (count==1){
    two.style.display = "block";

  }else if(count==2){
    three.style.display = "block";
    nextBtn.style.display = "none";
  }
}
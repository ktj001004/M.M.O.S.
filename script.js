function clock(){
  const today = new Date();
  const weekday = ["일","월","화","수","목","금","토"];
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let day = weekday[today.getDay()];
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  const date = yyyy + ". " + mm + ". " + dd+ ". (" + day + ")";
  const time = hours + ' : ' + minutes;
  document.getElementById("date").innerHTML = date + " " + time;
}

let items = [];
function add() {
  let item = document.getElementById('ADD').value;
  if(item != "" & item.length < 21){
    items.push(item);
    for (i = 0; i < items.length; i++) {
      if (localStorage.getItem(i) == null){
        localStorage.setItem(i, `
          <tr class="li" id="content_${i}">
            <td><input type="checkbox" id="box_${i}" name="done" value="${i}" onclick='checkboxEvent(event)'></td>
            <td><li id="li_${i}">${items[i]}</li></td>
            <td><img class="icon" id="del_${i}" src="trashbin.png" alt="delete" onclick="del(${i})"></td>
            <td><img class="icon" id="move_${i}" src="up-arrow.png" alt="move" onmouseover="move(${i})"></td>
          </tr>
        `);
        const a = localStorage.getItem(i);
        const b = document.getElementById("list").innerHTML;
        document.getElementById("list").innerHTML = b+a;
      }
    }
    document.getElementById('ADD').value = "";
  } else {
    alert("한 글자 이상, 20글자 이하의 값을 입력해주세요!");
    document.getElementById('ADD').value = "";
  }
}


let currentChecking = [];
function checkboxEvent(event)  {
  if(event.target.checked) {
    currentChecking.push(event.target.value);
    localStorage.setItem("underline", currentChecking);
  } else {
    for(var i = 0; i < currentChecking.length; i++){
      if (currentChecking[i] === event.target.value) {
        currentChecking.splice(i, 1);
        i--;
      }
    }
    localStorage.setItem("underline", currentChecking);
    console.log(currentChecking);
    console.log(localStorage.getItem("underline"));
  }
  var a = "";
  for(var i = -1; i < currentChecking.length; i++){
    a = a + `
      #li_${currentChecking[i]} {
        text-decoration : underline;
        text-decoration-line: line-through;
      }`;
    document.getElementById("checkboxstyle").innerHTML = a;

  }
}





function move(i){
}

function setting() {
  for (i = 0; i < localStorage.length-1; i++) {
    if (localStorage.key(i) === "underline"){
      if (localStorage.getItem("underline").length > 1){
        currentChecking = localStorage.getItem("underline").split(',');
      } else {
        currentChecking = [localStorage.getItem("underline")];
      }
    }
    items.push(localStorage.getItem(i));
    const a = localStorage.getItem(i);
    const b = document.getElementById("list").innerHTML;
    document.getElementById("list").innerHTML = b+a;
  }
  var a = "";
  for(var i = 0; i < currentChecking.length; i++){
    a = a+ `
      #li_${currentChecking[i]} {
        text-decoration : underline;
        text-decoration-line: line-through;
      }`;
    $(`#box_${currentChecking[i]}`).prop("checked", true);
    document.getElementById("checkboxstyle").innerHTML = a;
  }
}

function init() {
  window.document.ondragstart = new Function("return false");
  Function("return false");
  setting();
  clock();
  setInterval(clock, 1000);
  document.getElementById('ADD').focus();
}

init();

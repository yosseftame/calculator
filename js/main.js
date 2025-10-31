let eq = document.getElementsByClassName("eq")[0];
let res = document.getElementById("res");
let reset = document.querySelector(".reset");
let result = document.querySelector("#result");
let nums = document.querySelectorAll(".nums div");
let listSeprated;

// Access By Keyboard
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getResult();
  } else{
    res.textContent += `${event.key}`.trim();
    console.log(event.key);
  }
});

// Show Operations In Body
nums.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (
      e.target.textContent.trim() != "=" &&
      e.target.textContent.trim() != "Reset"
    ) {
      res.textContent += e.target.textContent.trim();
    }
  });
});

let getResult = (eq.onclick = function (e) {
  //  Regular Expression To Save The Operations
  listSeprated = res.textContent.split(/([+\-*/])/);
  // Make Negative Numbers
  for (let k = 0; k < listSeprated.length; k++) {
    if (listSeprated[k] == "-") {
      listSeprated[k + 1] = parseInt(listSeprated[k + 1]) * -1;
    }
  }
  //  multiplication and devision
  for (let j = 0; j < listSeprated.length; j++) {
    if (listSeprated[j] == "*") {
      listSeprated.splice(
        j - 1,
        3,
        +listSeprated[j - 1] * +listSeprated[j + 1]
      );
      j -= 1;
    }
    if (listSeprated[j] == "/") {
      listSeprated.splice(
        j - 1,
        3,
        +listSeprated[j - 1] / +listSeprated[j + 1]
      );
      j -= 1;
    }
  }

  //  Convert Str +=> Numbers And Let Operations

  let finalResult = listSeprated
    .map(function (el) {
      if (isNaN(el)) {
        return el;
      } else {
        return parseInt(el);
      }
    })
    // Sum All Nums
    .reduce(function (acc, cur) {
      if (isNaN(acc)) {
        return cur;
      }
      if (isNaN(cur)) {
        return acc;
      }
      return +acc + +cur;
    });
  // Updated Value
  res.textContent = "";
  result.textContent = finalResult;
});

reset.onclick = function () {
  result.textContent = 0;
};

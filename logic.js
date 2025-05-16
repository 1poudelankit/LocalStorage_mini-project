const form = document.querySelector("form");
const main = document.querySelector(".main");
const inputs = document.querySelectorAll("input"); // Fixed: input -> inputs
let p = document.createElement("p");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = event.target[0].value.trim();
  let email = event.target[1].value.trim();
  let phone = event.target[2].value.trim();
  let checkStatus = false;
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  // Clear previous error message
  p.innerText = "";
  
  if (name === "" || email === "" || phone === "") {
    checkStatus = true;
    p.innerText = "Please, fill the form!";
    p.style.color = "red";
    form.append(p);
  } else {
    for (let obj of userData) {
      if (obj.email === email && obj.phone === phone) {
        checkStatus = true;
        p.innerText = "Email and Number already exist";
        p.style.color = "red";
        form.append(p);
        break;
      } else if (obj.email === email) {
        checkStatus = true;
        p.innerText = "Email already exists";
        p.style.color = "red";
        form.append(p);
        break;
      } else if (obj.phone === phone) {
        checkStatus = true;
        p.innerText = "Phone number already exists";
        p.style.color = "red";
        form.append(p);
        break;
      }
    }
  }

  if (!checkStatus) {
    userData.push({ name, email, phone });
    localStorage.setItem("userDetails", JSON.stringify(userData));
    displayData();
    event.target.reset();
  }
});

// ❌ Fixing incorrect input listener:
// Original:
// input.forEach (addEventListener("click",(e)=>{
//   if (p.innerText!=""){
//     p.remove(form);
//   }
// }));

// ✅ Correct version:


let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = "";

  userData.forEach((element, i) => {
    finalData += `
      <div class="items">
        <span onclick="removeData(${i})" style="cursor:pointer;">&times;</span>
        <h4>Name</h4>
        <div class="items-value">${element.name}</div>

        <h4>Email</h4>
        <div class="items-value">${element.email}</div>

        <h4>Phone</h4>
        <div class="items-value">${element.phone}</div>
      </div>`;
  });

  main.innerHTML = finalData;
};
displayData();

// Function to remove user
function removeData(index) {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  userData.splice(index, 1);
  localStorage.setItem("userDetails", JSON.stringify(userData));
  displayData();
}

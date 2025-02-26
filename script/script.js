let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");
let warnPara = document.getElementById("warnPara");
let resetBtn = document.getElementById("resetBtn");

// To show input slider value
sliderValue.textContent = inputSlider.value;

// To show dynamic slider value
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

// To show generated password
genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

// Function to generate password with validation
function generatePassword() {
  let genPassword = "";
  let allChars = "";

  // Get selected character sets
  allChars += lowercase.checked ? lowerChars : "";
  allChars += uppercase.checked ? upperChars : "";
  allChars += numbers.checked ? allNumbers : "";
  allChars += symbols.checked ? allSymbols : "";

  // Validation, If no checkboxes are selected
  if (allChars.length === 0) {
    warnPara.innerText =
      "Please generate password using slider and set character set!";
    warnPara.style.color = "red";
    return "";
  }

  warnPara.innerText = "";

  // Generate password of given length
  for (let i = 1; i <= inputSlider.value; i++) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return genPassword;
}

// Event listener for Generate Password button
genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

// Event listener for Copy Password button
copyIcon.addEventListener("click", () => {
  if (passBox.value === "") {
    warnPara.innerText = "Please generate a password before copying it!";
    warnPara.style.color = "red";
    return;
  }

  // Copy password to clipboard
  navigator.clipboard.writeText(passBox.value);
  copyIcon.innerText = "check";
  copyIcon.title = "Password Copied";
  warnPara.innerText = "Password copied successfully!";
  warnPara.style.color = "green";

  // Reset icon after 3 seconds
  setTimeout(() => {
    copyIcon.innerHTML = "content_copy";
    copyIcon.title = "";
    warnPara.innerText = "";
  }, 3000);
});

// Function to reset everything
function resetGenerator() {
  inputSlider.value = 8;
  sliderValue.textContent = 8;

  passBox.value = "";

  lowercase.checked = false;
  uppercase.checked = false;
  numbers.checked = false;
  symbols.checked = false;

  warnPara.innerText = "";

  copyIcon.innerHTML = "content_copy";
  copyIcon.title = "";
}

// Event listener for Reset Button
resetBtn.addEventListener("click", resetGenerator);

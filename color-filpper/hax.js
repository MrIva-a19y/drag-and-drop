const btn = document.getElementById("btn");
const color = document.getElementsByClassName("color-flipper-container")[0];
const colorText = document.getElementsByClassName("textcolor")[0];

btn.addEventListener("click", function () {
  const randomColor = getRandomColor();
  color.style.backgroundColor = randomColor;
  colorText.textContent = randomColor;
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

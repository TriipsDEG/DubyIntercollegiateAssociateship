const lines = [
  "Duby",
  "Intercollegiate",
  "Associateship"
];

const speed = 90;

function typeLine(text, element, callback) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      setTimeout(callback, 200);
    }
  }

  type();
}

// Run sequentially
window.addEventListener("load", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  typeLine(lines[0], line1, () => {
    typeLine(lines[1], line2, () => {
      typeLine(lines[2], line3);
    });
  });
});


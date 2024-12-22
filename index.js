const display = document.getElementById("display");
    var isEditMode = false;
    // const math = mathjs; // Access mathjs directly

    function appendToDisplay(value) {
      if (isEditMode) {
        display.value += value;
      }
    }

    function clearDisplay() {
      display.value = "";
    }

    function calculate() {
      try {
        display.value = math.evaluate(display.value); 
      } catch (error) {
        display.value = "Error";
      }
      isEditMode = false; 
      display.readOnly = true;
    }


function toggleEditMode() {
  isEditMode = !isEditMode;
  display.readOnly = !isEditMode;
}

// Keyboard and mouse events
display.addEventListener("click", () => {
  if (!isEditMode) {
    toggleEditMode();
  }
});

display.addEventListener("keydown", (event) => {
  if (isEditMode) {
    // Handle arrow keys for editing
    if (event.key === "ArrowLeft") {
      // Move cursor left
      const cursorPosition = display.selectionStart;
      if (cursorPosition > 0) {
        display.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
    } else if (event.key === "ArrowRight") {
      // Move cursor right
      const cursorPosition = display.selectionStart;
      if (cursorPosition < display.value.length) {
        display.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      }
    } else if (event.key === "Backspace") {
      // Remove character at cursor
      const cursorPosition = display.selectionStart;
      display.value =
        display.value.slice(0, cursorPosition - 1) +
        display.value.slice(cursorPosition);
      display.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
  }
});

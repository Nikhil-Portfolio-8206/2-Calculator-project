   const display = document.getElementById('display');
    let isEditMode = false; 

    function appendToDisplay(value) {
      if (isEditMode) {
        display.value += value; 
      }
    }

    function clearDisplay() {
      display.value = '';
    }

    function calculate() {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
      isEditMode = false; // Exit edit mode after calculation
      display.readOnly = true; 
    }

    function toggleEditMode() {
      isEditMode = !isEditMode; 
      display.readOnly = !isEditMode; 
    }

    // Keyboard and mouse events
    display.addEventListener('click', () => {
      if (!isEditMode) {
        toggleEditMode(); 
      }
    });

    display.addEventListener('keydown', (event) => {
      if (isEditMode) {
        // Handle arrow keys for editing
        if (event.key === 'ArrowLeft') {
          // Move cursor left
          const cursorPosition = display.selectionStart;
          if (cursorPosition > 0) {
            display.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
          }
        } else if (event.key === 'ArrowRight') {
          // Move cursor right
          const cursorPosition = display.selectionStart;
          if (cursorPosition < display.value.length) {
            display.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
          }
        } else if (event.key === 'Backspace') {
          // Remove character at cursor
          const cursorPosition = display.selectionStart;
          display.value = display.value.slice(0, cursorPosition - 1) + display.value.slice(cursorPosition);
          display.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }
      }
    });
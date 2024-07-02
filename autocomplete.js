import { tickers } from './constants.js';

// Define available keywords
const availableKeywords = tickers;

// Select relevant DOM elements
const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

// Event listener for input box input event
inputBox.addEventListener('input', function() {
    let input = inputBox.value.trim().toLowerCase(); // Get input value in lowercase
    let results = availableKeywords.filter(keyword => keyword.toLowerCase().startsWith(input));
    display(results);
});

// Event listener for input box focus event (to show options)
inputBox.addEventListener('focus', function() {
    let input = inputBox.value.trim().toLowerCase(); // Get input value in lowercase
    let results = availableKeywords.filter(keyword => keyword.toLowerCase().startsWith(input));
    display(results);
});

// Event listener to hide results when clicking outside of input box or results box
document.addEventListener('click', function(event) {
    const isClickInsideInput = inputBox.contains(event.target);
    const isClickInsideResults = resultsBox.contains(event.target);

    if (!isClickInsideInput && !isClickInsideResults) {
        resultsBox.style.display = 'none'; // Hide results
        selectedResultIndex = -1; // Reset selected index
    }
});

// Function to display results in the result box
function display(results) {
    const content = results.map(result => `<li>${result}</li>`).join('');
    resultsBox.innerHTML = '<ul>' + content + '</ul>';
    resultsBox.style.display = results.length > 0 ? 'block' : 'none'; // Show/hide results box

    // Add click event listener to each suggestion item
    const items = resultsBox.querySelectorAll('li');
    items.forEach((item, index) => {
        item.addEventListener('click', function() {
            inputBox.value = results[index]; // Set input value to clicked item
            resultsBox.style.display = 'none'; // Hide results box
            selectedResultIndex = -1; // Reset selected index
        });
    });
}

let selectedResultIndex = -1; // Track selected result index

// Handle keyboard navigation (Arrow keys)
inputBox.addEventListener('keydown', function(event) {
    const results = Array.from(resultsBox.querySelectorAll('li'));

    if (event.key === 'ArrowUp' && selectedResultIndex > 0) {
        selectedResultIndex--;
    } else if (event.key === 'ArrowDown' && selectedResultIndex < results.length - 1) {
        selectedResultIndex++;
    }

    // Highlight the selected item
    results.forEach((result, index) => {
        if (index === selectedResultIndex) {
            result.classList.add('selected');
            inputBox.value = result.textContent.trim(); // Set input value to selected item
        } else {
            result.classList.remove('selected');
        }
    });
});

// Handle Enter key to select the highlighted item and close the menu
inputBox.addEventListener('keydown', function(event) {
    const results = Array.from(resultsBox.querySelectorAll('li'));

    if (event.key === 'Enter') {
        if (selectedResultIndex !== -1) {
            inputBox.value = results[selectedResultIndex].textContent.trim();
        }
        resultsBox.style.display = 'none'; // Hide results
        selectedResultIndex = -1; // Reset selected index
    }
});

// Handle backspacing to reset selected index
inputBox.addEventListener('keyup', function(event) {
    if (event.key === 'Backspace') {
        selectedResultIndex = -1; // Reset selected index
    }
});

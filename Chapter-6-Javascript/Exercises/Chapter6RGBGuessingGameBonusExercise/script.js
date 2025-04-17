// Game state variables
let score = 0;
let lives = 3;
let correctColor = null;
let gameActive = true;

// DOM elements
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const targetRgbElement = document.getElementById('target-rgb');
const colorOptionsContainer = document.getElementById('color-options');
const feedbackElement = document.getElementById('feedback');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

// Initialize the game
function initGame() {
    score = 0;
    lives = 3;
    gameActive = true;
    updateScoreDisplay();
    gameOverElement.classList.remove('show');
    generateNewRound();
}

// Generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

// Format RGB color as a string
function formatRgb(color) {
    return `RGB(${color.r}, ${color.g}, ${color.b})`;
}

// Generate a new round of the game
function generateNewRound() {
    if (!gameActive) return;
    
    // Clear previous options and feedback
    colorOptionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    
    // Generate the correct color (ensure it's not too dark/light for visibility)
    correctColor = generateRandomColor();
    targetRgbElement.textContent = formatRgb(correctColor);
    
    // Generate 3 color options (including the correct one)
    const options = [correctColor];
    for (let i = 0; i < 2; i++) {
        options.push(generateRandomColor());
    }
    
    // Shuffle the options
    options.sort(() => Math.random() - 0.5);
    
    // Create color option elements
    options.forEach((color) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        // Accessibility - add ARIA label
        colorOption.setAttribute('aria-label', `Color with RGB values ${color.r}, ${color.g}, ${color.b}`);
        
        // Add click event listener
        colorOption.addEventListener('click', () => {
            if (gameActive) {
                handleColorSelection(color);
            }
        });
        
        colorOptionsContainer.appendChild(colorOption);
    });
}

// Handle color selection
function handleColorSelection(selectedColor) {
    if (!gameActive) return;
    
    // Check if the selected color is correct
    const isCorrect = selectedColor.r === correctColor.r && 
                      selectedColor.g === correctColor.g && 
                      selectedColor.b === correctColor.b;
    
    if (isCorrect) {
        // Correct guess
        score++;
        feedbackElement.textContent = 'Correct! Well done!';
        feedbackElement.className = 'feedback correct';
    } else {
        // Incorrect guess
        lives--;
        feedbackElement.textContent = `Incorrect! The color was ${formatRgb(correctColor)}`;
        feedbackElement.className = 'feedback incorrect';
    }
    
    // Update the display
    updateScoreDisplay();
    
    // Check if game should continue
    if (lives <= 0) {
        endGame();
    } else {
        // Generate a new round after a short delay
        setTimeout(generateNewRound, 1500);
    }
}

// Update score and lives display
function updateScoreDisplay() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

// End the game
function endGame() {
    gameActive = false;
    finalScoreElement.textContent = score;
    gameOverElement.classList.add('show');
    
    // Disable color options
    const options = document.querySelectorAll('.color-option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.6';
    });
}

// Event listener for play again button
playAgainButton.addEventListener('click', initGame);

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are loaded
    setTimeout(initGame, 100);
});
// Word categories and words for each level
const categories = {
    'Fruits': ['Apple', 'Banana', 'Mango'],
    'Furniture': ['Table', 'Chair', 'Desk'],
    'Stationery': ['Pencil', 'Pen', 'Marker'],
    'Colors': ['Red', 'Yellow', 'Blue'],
    'Fabric': ['Cotton', 'Silk', 'Wool'],
    'Vehicles': ['Car', 'Bus', 'Bike'],
    'Countries': ['USA', 'Canada', 'India'],
};

// Global variables
let currentLevel = 1;
let score = 0;
let currentWords = [];
let selectedWords = [];

// Start game logic
document.getElementById('startBtn').addEventListener('click', startGame);

// Function to start the game
function startGame() {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    document.getElementById('winBox').style.display = 'none';
    currentLevel = 1;
    score = 0;
    updateScore();
    nextLevel();
}

// Function to update the score
function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Function to proceed to the next level
function nextLevel() {
    const levelTitle = document.getElementById('levelTitle');
    const wordButtonsContainer = document.getElementById('wordButtonsContainer');
    
    // Prepare words for the current level
    currentWords = getWordsForLevel(currentLevel);
    wordButtonsContainer.innerHTML = ''; // Clear previous buttons

    levelTitle.textContent = `Level ${currentLevel}`;

    // Display the words as buttons
    currentWords.forEach(word => {
        const button = document.createElement('button');
        button.textContent = word;
        button.classList.add('wordButton');
        button.addEventListener('click', () => selectWord(word));
        wordButtonsContainer.appendChild(button);
    });

    // Instructions for the player
    document.getElementById('instructions').textContent = `Select 3 words from the same category.`;
}

// Function to get words for the current level
function getWordsForLevel(level) {
    let allWords = [];
    let selectedCategories = [];

    // Select unique categories for this level
    let categoriesArray = Object.keys(categories);
    while (selectedCategories.length < level + 1) {
        const randomCategory = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
        
        // Ensure categories don't repeat
        if (!selectedCategories.includes(randomCategory)) {
            selectedCategories.push(randomCategory);
            allWords = allWords.concat(categories[randomCategory]);
        }
    }

    // Shuffle the words
    allWords = shuffle(allWords);
    return allWords.slice(0, level * 3); // Return level * 3 words
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Function to handle word selection
function selectWord(word) {
    selectedWords.push(word);
    
    if (selectedWords.length === 3) {
        checkSelection();
    }
}

// Function to check the selected words
function checkSelection() {
    const category = getCategoryOfWord(selectedWords[0]);
    const isValid = selectedWords.every(word => getCategoryOfWord(word) === category);

    if (isValid) {
        score += 25 * currentLevel; // Increase score based on level
        updateScore();
        selectedWords = [];
        showWinBox();

        if (currentLevel < 5) {
            document.getElementById('nextLevelBtn').onclick = () => {
                currentLevel++;
                nextLevel();
                document.getElementById('winBox').style.display = 'none';
            };
        } else {
            document.getElementById('winMessage').textContent = "Congratulations! You've completed all levels!";
            document.getElementById('nextLevelBtn').style.display = 'none'; // Hide button after level 5
        }
    } else {
        gameOver();
    }
}

// Function to display the win message box
function showWinBox() {
    document.getElementById('winBox').style.display = 'block';
    document.getElementById('winMessage').textContent = `You win this level! Moving to next level.`;
}

// Function to get category of a word
function getCategoryOfWord(word) {
    for (let category in categories) {
        if (categories[category].includes(word)) {
            return category;
        }
    }
    return null;
}

// Function to end the game
function gameOver() {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('winBox').style.display = 'none';
    alert(`Game Over! Your score is: ${score}`);
    location.reload(); // Reload the page to restart the game
}

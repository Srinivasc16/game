const games = [
  {
    title: "Ludo",
    description: "Play Ludo",
    thumbnail: "ludo.jpg",
    url: "game1.html"
  },
  {
    title: "Quiz",
    description: "Play Quiz",
    thumbnail: "multi.png",
    url: "game2.html"
  },
  {
    title: "Snake & Ladder",
    description: "Play Snake&ladder",
    thumbnail: "snake.png",
    url: "game3.html"
  },
  {
      title: "CourtRoom",
      description: "Play Courtroom",
      thumbnail: "court.png",
      url: "game4.html"
    },
    {
      title: "CrossWord",
      description: "Play Crossword",
      thumbnail: "cross.png",
      url: "game5.html"
    },
    {
      title: "HangMan",
      description: "Play Hangman",
      thumbnail: "hangman.png",
      url: "game6.html"
    },
    {
      title: "Word Scramble",
      description: "Play Wordscramble",
      thumbnail: "game7.png",
      url: "game7.html"
    },
    {
      title: "Word Speed",
      description: "Play Wordspeed",
      thumbnail: "game8.jpg",
      url: "game8.html"
    },
    {
      title: "Memory Map",
      description: "Play Memorymap",
      thumbnail: "game9.jpg",
      url: "game9.html"
    },
    {
      title: "Maze",
      description: "Play Maze game",
      thumbnail: "game10.jpg",
      url: "maze.html"
    },
    {
      title: "Fruit ninja",
      description: "Play Fruit ninja",
      thumbnail: "game9.jpg",
      url: "ninja.html"
    },
    {
      title: "Monopoly",
      description: "Play Monopoly",
      thumbnail: "game9.jpg",
      url: "mono.html"
    }
];

// Generate game thumbnails
const gameGrid = document.querySelector(".game-grid");
games.forEach((game) => {
const gameThumbnail = document.createElement("div");
gameThumbnail.classList.add("game-thumbnail");
gameThumbnail.innerHTML = `
  <img src="${game.thumbnail}" alt="${game.title}">
  <h2>${game.title}</h2>
  <p>${game.description}</p>
  <button data-url="${game.url}">Play Now</button>
`;
gameGrid.appendChild(gameThumbnail);
});

// Add event listeners to game thumbnails
const gameThumbnails = document.querySelectorAll(".game-thumbnail");
gameThumbnails.forEach((thumbnail) => {
thumbnail.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const gameUrl = e.target.getAttribute("data-url");
    window.location.href = gameUrl;
  }
});
});
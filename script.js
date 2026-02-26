// Global variables
let gameStates = {
    original: {
        board: [],
        score: 0,
        best: localStorage.getItem('bestScore') || 0,
        won: false,
        over: false,
        sound: true
    },
    classic: {
        board: [],
        score: 0,
        best: localStorage.getItem('classicBestScore') || 0,
        won: false,
        over: false,
        sound: true
    },
    cupcakes: {
        board: [],
        score: 0,
        best: localStorage.getItem('cupcakesBestScore') || 0,
        won: false,
        over: false,
        sound: true,
        history: [],
        moves: 0,
        startTime: 0,
        elapsedTime: 0
    },
    taylor: {
        board: [],
        score: 0,
        best: localStorage.getItem('taylorBestScore') || 0,
        won: false,
        over: false,
        sound: true
    }
};

const BOARD_SIZE = 4;

// DOM Elements
const gameSections = {
    home: document.getElementById('home'),
    classic: document.getElementById('classic-2048'),
    cupcakes: document.getElementById('2048-cupcakes'),
    taylor: document.getElementById('taylor-swift-2048'),
    ai: document.getElementById('2048-ai'),
    variants: document.getElementById('2048-variants')
};

const gameBoards = {
    original: document.getElementById('game-board'),
    classic: document.getElementById('classic-game-board'),
    cupcakes: document.getElementById('cupcakes-game-board'),
    taylor: document.getElementById('taylor-game-board')
};

const scoreElements = {
    original: {
        score: document.getElementById('score'),
        best: document.getElementById('best')
    },
    classic: {
        score: document.getElementById('classic-score'),
        best: document.getElementById('classic-best')
    },
    cupcakes: {
        score: document.getElementById('cupcakes-score'),
        best: document.getElementById('cupcakes-best')
    },
    taylor: {
        score: document.getElementById('taylor-score'),
        best: document.getElementById('taylor-best')
    }
};

// Navigation logic
function setupNavigation() {
    // Handle navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Hide all sections
            Object.values(gameSections).forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the selected section
            if (href === '/') {
                gameSections.home.style.display = 'block';
            } else if (href === '/classic-2048/') {
                gameSections.classic.style.display = 'block';
                initGame('classic');
            } else if (href === '/2048-cupcakes/') {
                gameSections.cupcakes.style.display = 'block';
                initGame('cupcakes');
            } else if (href === '/taylor-swift-2048/') {
                gameSections.taylor.style.display = 'block';
                initGame('taylor');
            } else if (href === '/2048-ai/') {
                gameSections.ai.style.display = 'block';
            } else if (href === '/2048-variants/') {
                gameSections.variants.style.display = 'block';
            }
        });
    });

    // Handle hero buttons
    document.querySelectorAll('.hero .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#play-original') {
                // Scroll to original game
                document.getElementById('play-original').scrollIntoView({ behavior: 'smooth' });
            } else if (href === '/2048-cupcakes/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.cupcakes.style.display = 'block';
                initGame('cupcakes');
            } else if (href === '/2048-ai/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.ai.style.display = 'block';
            } else if (href === '/taylor-swift-2048/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.taylor.style.display = 'block';
                initGame('taylor');
            }
        });
    });

    // Handle variant links
    document.querySelectorAll('.variant-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '/2048-cupcakes/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.cupcakes.style.display = 'block';
                initGame('cupcakes');
            } else if (href === '/taylor-swift-2048/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.taylor.style.display = 'block';
                initGame('taylor');
            } else if (href === '/2048-ai/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.ai.style.display = 'block';
            }
        });
    });
    
    // Handle version card links
    document.querySelectorAll('.version-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            console.log('Version card button clicked, href:', href);
            
            if (href === '/classic-2048/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.classic.style.display = 'block';
                initGame('classic');
            } else if (href === '/taylor-swift-2048/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.taylor.style.display = 'block';
                initGame('taylor');
            } else if (href === '/2048-cupcakes/') {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.cupcakes.style.display = 'block';
                initGame('cupcakes');
            } else if (href === '/2048-ai/') {
                console.log('AI 2048 link clicked, showing AI section');
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.ai.style.display = 'block';
                console.log('AI section display style:', gameSections.ai.style.display);
            } else {
                console.log('Unhandled href:', href);
            }
        });
    });
    
    // Handle variant category links
    document.querySelectorAll('.variant-category .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href.includes('/2048-variants/')) {
                Object.values(gameSections).forEach(section => {
                    section.style.display = 'none';
                });
                gameSections.variants.style.display = 'block';
            }
        });
    });
}

// Game initialization
function initGame(gameType) {
    const gameState = gameStates[gameType];
    const gameBoard = gameBoards[gameType];
    const scoreElement = scoreElements[gameType].score;
    const bestElement = scoreElements[gameType].best;
    
    // Check if game elements exist
    if (!gameBoard || !scoreElement || !bestElement) {
        console.log(`Game elements not found for ${gameType}, skipping initialization`);
        return;
    }
    
    // Initialize board
    gameState.board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    gameState.score = 0;
    gameState.won = false;
    gameState.over = false;
    // Sound setting is preserved
    
    if (gameType === 'cupcakes') {
        gameState.history = [];
        gameState.moves = 0;
        gameState.startTime = Date.now();
        gameState.elapsedTime = 0;
        // Update score titles for cupcakes
        document.querySelector('#cupcakes-score').parentElement.querySelector('.score-title').textContent = 'KCAL';
        document.querySelector('#cupcakes-best').parentElement.querySelector('.score-title').textContent = 'KCAL MAX';
    }
    
    // Add initial tiles
    addRandomTile(gameType);
    addRandomTile(gameType);
    
    // Update UI
    renderBoard(gameType);
    scoreElement.textContent = gameState.score;
    bestElement.textContent = gameState.best;
    
    // Update sound button text
    updateSoundButton(gameType);
    
    // Start timer for cupcakes
    if (gameType === 'cupcakes') {
        startTimer(gameType);
    }
}

// Update sound button text based on current sound setting
function updateSoundButton(gameType) {
    // Skip Taylor Swift game since it's now an external link
    if (gameType === 'taylor') return;
    
    const gameState = gameStates[gameType];
    const buttonId = gameType === 'original' ? 'original-sound' : `${gameType}-sound`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.textContent = `Sound: ${gameState.sound ? 'On' : 'Off'}`;
    }
}

// Add random tile
function addRandomTile(gameType) {
    const gameState = gameStates[gameType];
    const emptyCells = [];
    
    // Find empty cells
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (gameState.board[y][x] === 0) {
                emptyCells.push({ x, y });
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState.board[y][x] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render board
function renderBoard(gameType) {
    const gameState = gameStates[gameType];
    const gameBoard = gameBoards[gameType];
    
    if (!gameBoard) return;
    
    // Clear board
    gameBoard.innerHTML = '';
    
    // Render tiles
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const value = gameState.board[y][x];
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            if (value > 0) {
                tile.classList.add(`tile-${value}`);
                
                // Set content based on game type
                if (gameType === 'taylor') {
                    // For Taylor Swift version, use the thumbnail image with album names
                    tile.style.display = 'flex';
                    tile.style.flexDirection = 'column';
                    tile.style.alignItems = 'center';
                    tile.style.justifyContent = 'center';
                    
                    const img = document.createElement('img');
                    // Use the Taylor Swift thumbnail image
                    img.src = 'assets/img/taylor/taylor-swift.jpg';
                    img.alt = 'Taylor Swift';
                    img.style.width = '70%';
                    img.style.height = '70%';
                    img.style.objectFit = 'contain';
                    
                    const albumNames = {
                        2: 'Taylor Swift',
                        4: 'Fearless',
                        8: 'Speak Now',
                        16: 'Red',
                        32: '1989',
                        64: 'Reputation',
                        128: 'Lover',
                        256: 'Folklore',
                        512: 'Evermore',
                        1024: 'Midnights',
                        2048: 'TTPD'
                    };
                    
                    const albumName = document.createElement('div');
                    albumName.textContent = albumNames[value] || value;
                    albumName.style.fontSize = '0.8rem';
                    albumName.style.fontWeight = 'bold';
                    albumName.style.marginTop = '5px';
                    albumName.style.color = '#4d2523';
                    albumName.style.textAlign = 'center';
                    
                    tile.appendChild(img);
                    tile.appendChild(albumName);
                } else if (gameType === 'cupcakes') {
                    // For cupcakes version, use actual images with numbers
                    tile.style.display = 'flex';
                    tile.style.flexDirection = 'column';
                    tile.style.alignItems = 'center';
                    tile.style.justifyContent = 'center';
                    
                    const img = document.createElement('img');
                    img.src = `assets/img/cupcakes/${value}.png`;
                    img.alt = `Cupcake ${value}`;
                    img.style.width = '70%';
                    img.style.height = '70%';
                    img.style.objectFit = 'contain';
                    
                    const number = document.createElement('div');
                    number.textContent = value;
                    number.style.fontSize = '1rem';
                    number.style.fontWeight = 'bold';
                    number.style.marginTop = '5px';
                    number.style.color = '#4d2523';
                    
                    tile.appendChild(img);
                    tile.appendChild(number);
                } else {
                    tile.textContent = value;
                }
            }
            
            gameBoard.appendChild(tile);
        }
    }
}

// Game logic
function move(gameType, direction) {
    const gameState = gameStates[gameType];
    const scoreElement = scoreElements[gameType].score;
    const bestElement = scoreElements[gameType].best;
    
    if (gameState.over || gameState.won) return;
    
    // Save current state for undo (cupcakes only)
    if (gameType === 'cupcakes') {
        gameState.history.push({
            board: JSON.parse(JSON.stringify(gameState.board)),
            score: gameState.score,
            moves: gameState.moves,
            elapsedTime: gameState.elapsedTime
        });
        if (gameState.history.length > 3) {
            gameState.history.shift();
        }
    }
    
    let moved = false;
    let newScore = gameState.score;
    
    // Rotate board to simplify movement
    const rotatedBoard = rotateBoard(gameState.board, direction);
    const movedBoard = [];
    
    for (let y = 0; y < BOARD_SIZE; y++) {
        let row = rotatedBoard[y].filter(val => val !== 0);
        
        // Merge tiles
        for (let x = 0; x < row.length - 1; x++) {
            if (row[x] === row[x + 1]) {
                row[x] *= 2;
                newScore += row[x];
                row.splice(x + 1, 1);
                moved = true;
            }
        }
        
        // Fill with zeros
        while (row.length < BOARD_SIZE) {
            row.push(0);
        }
        
        if (!arraysEqual(rotatedBoard[y], row)) {
            moved = true;
        }
        
        movedBoard.push(row);
    }
    
    // Rotate back
    const finalBoard = rotateBoardBack(movedBoard, direction);
    
    if (moved) {
        gameState.board = finalBoard;
        gameState.score = newScore;
        
        // Update moves for cupcakes
        if (gameType === 'cupcakes') {
            gameState.moves++;
        }
        
        // Update best score
        if (newScore > gameState.best) {
            gameState.best = newScore;
            localStorage.setItem(`${gameType === 'original' ? '' : gameType}BestScore`, newScore);
        }
        
        // Add new tile
        addRandomTile(gameType);
        
        // Check for win
        if (!gameState.won && hasWon(gameState.board)) {
            gameState.won = true;
            setTimeout(() => alert('You won!'), 100);
        }
        
        // Check for game over
        if (!hasMovesLeft(gameState.board)) {
            gameState.over = true;
            setTimeout(() => alert('Game over!'), 100);
        }
        
        // Update UI
        renderBoard(gameType);
        scoreElement.textContent = gameState.score;
        bestElement.textContent = gameState.best;
        
        // Update cupcakes stats
        if (gameType === 'cupcakes') {
            updateCupcakesStats();
        }
        
        // Play sound for all games
        if (gameState.sound) {
            console.log(`Playing sound for ${gameType}`);
            try {
                playSound();
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        }
    }
}

// Rotate board for easier movement
function rotateBoard(board, direction) {
    const rotated = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            switch (direction) {
                case 'up':
                    rotated[y][x] = board[x][y];
                    break;
                case 'right':
                    rotated[y][x] = board[y][BOARD_SIZE - 1 - x];
                    break;
                case 'down':
                    rotated[y][x] = board[BOARD_SIZE - 1 - x][BOARD_SIZE - 1 - y];
                    break;
                case 'left':
                default:
                    rotated[y][x] = board[y][x];
                    break;
            }
        }
    }
    
    return rotated;
}

// Rotate board back
function rotateBoardBack(board, direction) {
    const rotated = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            switch (direction) {
                case 'up':
                    rotated[x][y] = board[y][x];
                    break;
                case 'right':
                    rotated[y][BOARD_SIZE - 1 - x] = board[y][x];
                    break;
                case 'down':
                    rotated[BOARD_SIZE - 1 - x][BOARD_SIZE - 1 - y] = board[y][x];
                    break;
                case 'left':
                default:
                    rotated[y][x] = board[y][x];
                    break;
            }
        }
    }
    
    return rotated;
}

// Check if arrays are equal
function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Check if player has won
function hasWon(board) {
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 2048) {
                return true;
            }
        }
    }
    return false;
}

// Check if there are moves left
function hasMovesLeft(board) {
    // Check for empty cells
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) {
                return true;
            }
        }
    }
    
    // Check for adjacent equal cells
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const value = board[y][x];
            
            // Check right
            if (x < BOARD_SIZE - 1 && board[y][x + 1] === value) {
                return true;
            }
            
            // Check down
            if (y < BOARD_SIZE - 1 && board[y + 1][x] === value) {
                return true;
            }
        }
    }
    
    return false;
}

// Initialize sound
function initSound() {
    try {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 10% volume
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1); // 100ms
        
        console.log('Sound initialized successfully');
    } catch (error) {
        console.error('Error initializing sound:', error);
    }
}

// Play sound (cupcakes only)
function playSound() {
    console.log('playSound called');
    // Check if sound is enabled for cupcakes
    const gameState = gameStates.cupcakes;
    console.log('Sound enabled:', gameState.sound);
    if (!gameState.sound) return;
    
    try {
        // Use Web Audio API for more reliable sound
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.error('Web Audio API not supported');
            return;
        }
        
        const audioContext = new AudioContext();
        
        // Resume audio context if it's suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Audio context resumed');
                createAndPlaySound(audioContext);
            }).catch(error => {
                console.error('Error resuming audio context:', error);
            });
        } else {
            createAndPlaySound(audioContext);
        }
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

// Create and play sound using audio context
function createAndPlaySound(audioContext) {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 10% volume
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1); // 100ms
        
        console.log('Sound played successfully');
    } catch (error) {
        console.error('Error creating and playing sound:', error);
    }
}

// Initialize audio context
function initAudioContext() {
    try {
        // Create an audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context initialized successfully');
        return audioContext;
    } catch (error) {
        console.error('Error initializing audio context:', error);
        return null;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Initialize audio context on first user interaction
    function handleFirstInteraction() {
        initAudioContext();
        console.log('First user interaction - audio context initialized');
        // Remove this listener after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }
    
    // Add event listeners for first interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    // New game buttons
    document.getElementById('new-game').addEventListener('click', () => initGame('original'));
    document.getElementById('classic-new-game').addEventListener('click', () => initGame('classic'));
    document.getElementById('cupcakes-new-game').addEventListener('click', () => initGame('cupcakes'));
    
    // Cupcakes specific buttons
    document.getElementById('cupcakes-undo').addEventListener('click', () => {
        const gameState = gameStates.cupcakes;
        if (gameState.history.length > 0) {
            const lastState = gameState.history.pop();
            gameState.board = lastState.board;
            gameState.score = lastState.score;
            gameState.moves = lastState.moves || 0;
            gameState.elapsedTime = lastState.elapsedTime || 0;
            renderBoard('cupcakes');
            document.getElementById('cupcakes-score').textContent = gameState.score;
            document.getElementById('cupcakes-best').textContent = gameState.best;
            updateCupcakesStats();
        }
    });
    
    document.getElementById('cupcakes-sound').addEventListener('click', () => {
        const gameState = gameStates.cupcakes;
        gameState.sound = !gameState.sound;
        document.getElementById('cupcakes-sound').textContent = `Sound: ${gameState.sound ? 'On' : 'Off'}`;
    });
    
    // Sound buttons for other games
    document.getElementById('original-sound').addEventListener('click', () => {
        const gameState = gameStates.original;
        gameState.sound = !gameState.sound;
        document.getElementById('original-sound').textContent = `Sound: ${gameState.sound ? 'On' : 'Off'}`;
    });
    
    document.getElementById('classic-sound').addEventListener('click', () => {
        const gameState = gameStates.classic;
        gameState.sound = !gameState.sound;
        document.getElementById('classic-sound').textContent = `Sound: ${gameState.sound ? 'On' : 'Off'}`;
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Determine active game
        let activeGame = 'original';
        
        if (gameSections.classic.style.display !== 'none') {
            activeGame = 'classic';
        } else if (gameSections.cupcakes.style.display !== 'none') {
            activeGame = 'cupcakes';
        } else if (gameSections.taylor.style.display !== 'none') {
            // Skip Taylor Swift game since it's now an external link
            return;
        } else if (gameSections.ai.style.display !== 'none') {
            // Skip AI game since it has its own controls
            return;
        }
        
        // Handle arrow keys
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                move(activeGame, 'up');
                break;
            case 'ArrowRight':
                e.preventDefault();
                move(activeGame, 'right');
                break;
            case 'ArrowDown':
                e.preventDefault();
                move(activeGame, 'down');
                break;
            case 'ArrowLeft':
                e.preventDefault();
                move(activeGame, 'left');
                break;
        }
    });
    
    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Determine direction
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal move
            if (Math.abs(diffX) > 20) {
                if (diffX > 0) {
                    moveActiveGame('left');
                } else {
                    moveActiveGame('right');
                }
            }
        } else {
            // Vertical move
            if (Math.abs(diffY) > 20) {
                if (diffY > 0) {
                    moveActiveGame('up');
                } else {
                    moveActiveGame('down');
                }
            }
        }
        
        // Reset
        touchStartX = 0;
        touchStartY = 0;
    });
}

// Move active game
function moveActiveGame(direction) {
    let activeGame = 'original';
    
    if (gameSections.classic.style.display !== 'none') {
        activeGame = 'classic';
    } else if (gameSections.cupcakes.style.display !== 'none') {
        activeGame = 'cupcakes';
    } else if (gameSections.taylor.style.display !== 'none') {
        // Skip Taylor Swift game since it's now an external link
        return;
    } else if (gameSections.ai.style.display !== 'none') {
        // Skip AI game since it has its own controls
        return;
    }
    
    move(activeGame, direction);
}

// Initialize app
function initApp() {
    setupNavigation();
    setupEventListeners();
    initGame('original');
}

// Timer function for cupcakes
let timerInterval;
function startTimer(gameType) {
    if (gameType !== 'cupcakes') return;
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Start new timer
    timerInterval = setInterval(() => {
        const gameState = gameStates.cupcakes;
        if (!gameState.over && !gameState.won) {
            gameState.elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
            updateCupcakesStats();
        }
    }, 1000);
}

// Update cupcakes stats (moves and time)
function updateCupcakesStats() {
    const gameState = gameStates.cupcakes;
    // Get the cupcakes section using getElementById which handles numeric IDs correctly
    const cupcakesSection = document.getElementById('2048-cupcakes');
    if (!cupcakesSection) return;
    
    // Get the game container using querySelector on the section element
    const gameContainer = cupcakesSection.querySelector('.game-container');
    if (!gameContainer) return;
    
    // Check if stats div exists
    let statsDiv = gameContainer.querySelector('.game-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.classList.add('game-stats');
        statsDiv.style.display = 'flex';
        statsDiv.style.justifyContent = 'space-between';
        statsDiv.style.marginTop = '15px';
        statsDiv.style.fontWeight = 'bold';
        gameContainer.appendChild(statsDiv);
    }
    
    // Update stats
    const moves = gameState.moves;
    const minutes = Math.floor(gameState.elapsedTime / 60);
    const seconds = gameState.elapsedTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    statsDiv.innerHTML = `
        <div>Moves: ${moves}</div>
        <div>Time: ${timeString}</div>
    `;
}

// Run app
initApp();
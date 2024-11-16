//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;


//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
};

//cactus
let cactusArray = [];
let cactusWidth = 34;  // Using only the small cactus
let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;
let cactusImg;
let cactusInterval;

//physics
let velocityX = -4;  // This will now be set based on difficulty in startGame
let velocityY = 0;
let gravity = .5;
let fallingGravity = 1.3; // Increased gravity for faster descent

let gameOver = false;
let score = 0;

// Typing game variables
let currentWord;
let wordInput;
let wordDisplay;
let typedWordDisplay;
let startButton;
let difficultySelect;
let readyToJump = false;
let previousWord = "";

// Difficulty-based dictionaries
const wordDictionaries = {
    easy: ["cat", "dog", "run", "jump", "play", "fun", "top", "mix", "red", "blue", "mud", "calm", "see", "eat", "day", "arm", "bomb", "bird", "ace", "ski",
          "ink", "pit", "cod", "bud", "boss", "any", "den", "ask", "aim", "odd", "sky", "bag", "win", "sit", "fig", "jog", "boy", "bus", "lot", "sin", "pan", 
          "bar", "cab", "end", "bad", "art", "jam", "oil", "rob", "lap", "con", "fit", "lap", "hen", "yes", "wig", "toy", "guy", "had", "toe", "sad", "let",
          "off", "rub", "max", "rib", "rip", "bum", "boo", "low", "two", "fog", "ten", "dry", "gym", "web", "mad", "hug", "new", "ram", "lab", "bat", "joy",
          "sea", "dye", "bee", "awe", "pet", "ant", "act", "ash", "dub", "old", "mug", "pen", "pad", "bow", "hit", "jaw", "fat", "own", "mat", "hop", "air",
          "fix", "zip", "fox", "bay", "cap", "tap", "buy", "big", "bed", "dug", "era", "may", "wag", "car", "cry", "sun", "box", "lip", "net", "all", "gas",
          "war", "ban", "kid", "his", "vet", "men", "peg", "bin", "foam", "rush", "hand", "belt", "glow", "wild", "cape", "bold", "gaze", "leaf", "flow", "desk",
          "hunt", "bear", "dark", "cook", "gold", "king", "boat", "wish", "roof", "ring", "card", "dust", "grid", "fire", "wave", "farm", "path", "bend", "dive",
          "join", "book", "ball", "twin", "bark", "drop", "plan", "sink", "spin", "land", "warm", "lamp", "pure", "tone", "sand", "back", "face", "wolf", "gift",
          "code", "snow", "rise", "good", "firm", "lock", "wrap", "open", "bank", "pair", "fort", "ring", "arch", "dust", "peak", "time", "save", "view", "foam",
          "quest", "shady", "blaze", "crisp", "curve", "flash", "gloom", "flour", "bound", "arrow", "frost", "chest", "brisk", "grasp", "spark", "sweep", "crown",
          "fancy", "flush", "ghost", "slide", "twist", "patch", "drift", "space", "chase", "track", "stone", "maple", "crave", "mount", "break", "charm", "grain",
          "trace", "stamp", "range", "bloom", "brush", "clear", "limit", "fault", "field", "prize", "level", "scale", "shine", "spare", "swing", "craft", "brave",
          "claim", "speed", "start", "blast", "fresh", "spade", "tight", "storm", "march", "smart", "forge", "booth", "coast", "flock", "steam", "blink", "roast",
          "taste", "clasp", "climb", "coast", "crept", "swift", "round", "steel", "snare", "stack", "chalk", "greet", "fruit", "stand", "catch", "freak", "grown",
          "equip", "agree", "value", "class", "check"],
    medium: ["cactus", "desert", "typing", "gaming", "running", "player", "faster", "higher", "dragon", "marvel", "fabric", "whisper", "puzzle", "timber",
            "bridge", "canvas", "forest", "summit", "spiral", "accent", "random", "gather", "hustle", "bright", "frosty", "castle", "extend", "corner", "travel",
            "linear", "frozen", "filter", "secure", "beacon", "remark", "sprint", "bamboo", "radius", "garage", "wonder", "branch", "detail", "access", "daring",
            "grocer", "smooth", "relate", "unique", "sparkle", "enlist", "silver", "banner", "custom", "finish", "sculpt", "volume", "market", "native", "spirit",
            "impact", "extend", "legend", "object", "forget", "accent", "button", "window", "border", "jungle", "clever", "strike", "launch", "wisely", "rescue",
            "spring", "vessel", "method", "sector", "tunnel", "remind", "remark", "vision", "dancer", "hidden", "invent", "grassy", "purple", "sample", "anchor",
            "friend", "wealth", "simple", "breeze", "remote", "finish", "income", "arctic", "motion", "silent", "shield", "garble", "vendor", "export", "target",
            "sphere", "plunge", "orange", "fusion", "figure", "safari", "narrow", "exotic", "matter", "repair", "modest", "weight", "empire", "almost", "layout",
            "lantern", "capture", "mystery", "fortune", "journey", "radiant", "harmony", "victory", "publish", "delight", "radical", "blanket", "freedom",
            "context", "beneath", "platter", "harvest", "divine", "magnify", "picture", "station", "triumph", "enlarge", "theater", "venture", "orbit", "courage",
            "channel", "liberty", "lighter", "ecology", "fantail", "therapy", "convert", "ancient", "shimmer", "message", "canteen", "limited", "fantasy",
            "justice", "hurdles", "passage", "apparel", "miracle", "horizon", "chimney", "elastic", "crystal", "resolve", "science", "purpose", "biology",
            "project", "skyline", "absence", "network", "disease", "process", "concept", "balance", "abandon", "organic", "diamond", "villain", "affable",
            "balloon", "texture", "margins", "drought", "calling", "physics", "teacher", "crumble", "various", "support", "absolve", "drifted", "enriches",
            "forgot", "grouper", "clipped", "healthy", "regroup", "plaster", "wander", "plastic", "teeming", "rotate", "distant", "knitted", "rebelled", "request",
            "glimmer", "fidget", "sturdy", "breath", "thanks", "seeker", "topping", "wasted", "online", "create", "spoiled", "studio", "hunter", "longer",
            "safety", "enjoyed", "result", "melody", "hunting", "compare", "improve", "compute", "expose", "govern", "ensure", "author", "promote", "finance",
            "include", "compete", "recycle", "diverse", "record", "develop", "direct", "provide", "invest"],
    hard: ["dinosaur", "adventure", "challenge", "crocodile", "dangerous", "exercises", "boulevard", "fantastic", "absolute", "backyard", "creative", "notebook",
          "strategy", "delegate", "fountain", "coverage", "villager", "complain", "blueprint", "skeleton", "optimize", "building", "cautious", "guardian",
          "mountain", "learning", "knowledge", "decision", "relation", "circular", "delivered", "analysis", "identity", "tomorrow", "vineyard", "supplier",
          "informer", "national", "software", "designer", "division", "declared", "possible", "property", "security", "provider", "consumer", "hospital",
          "timeline", "industry", "solution", "heritage", "personal", "laughter", "dialogue", "friction", "wildlife", "majority", "obstacle", "pursuing",
          "existing", "movement", "children", "elephant", "composer", "suitable", "campaign", "festival", "outbreak", "planning", "creation", "generate",
          "platform", "customer", "organize", "operator", "training", "advocate", "required", "disclose", "outgoing", "standard", "research", "monument",
          "register", "particle", "corridor", "keyboard", "disagree", "portrait", "template", "magazine", "elevator", "contrast", "emphasis", "addition",
          "boundary", "vacation", "approach", "alliance", "economic", "flexible", "backyard", "occasion", "workshop", "presence", "position", "portable",
          "elevates", "spectrum", "brilliant", "conflict", "painting", "shipping", "listings", "confused", "assembly", "computer", "official", "follower",
          "unlimited", "triangle", "structure", "president", "landscape", "resident", "countdown", "equipment", "agreement", "character", "detailing",
          "governing", "organized", "prototype", "discovery", "influence", "procedure", "education", "connected", "available", "awareness", "tolerance",
          "selection", "operation", "attention", "reference", "direction", "describe", "insurance", "principal", "emphasize", "strength", "authority", "promotion",
          "financing", "including", "volunteer", "marketing", "valuation", "situation", "residence", "integrity", "interview", "signature", "portfolio",
          "happiness", "gorgeous", "reporting", "institute", "complete", "lightning", "recycling", "placement", "associate", "exposure", "classroom", "continue",
          "diversity", "complaint", "invention", "mechanism", "together", "surprise", "revision", "mechanics", "relative", "specific", "recording", "organizer",
          "analyzing", "educating", "developer", "frequency", "forecast", "sociology", "checking", "discover", "velocity", "investing", "attached", "question",
          "completed", "duration", "recovery", "achieving", "lifelong", "exercise", "database", "advancing", "resource", "deletion", "lifeline", "location"]
};

const difficultySettings = {
    easy: {
        speed: -6,
        jumpVelocity: -11,     // Easier jump timing
        spawnInterval: 3000,
        jumpThreshold: 200   // More forgiving distance for jump timing
    },
    medium: {
        speed: -9,
        jumpVelocity: -11,     // Easier jump timing
        spawnInterval: 2100,
        jumpThreshold: 220      // Moderate distance for jump timing
    },
    hard: {
        speed: -11,
        jumpVelocity: -12,     // Easier jump timing
        spawnInterval: 2000,
        jumpThreshold: 220   // Stricter distance for jump timing
    }
};

let currentDifficulty = 'easy';
let animationFrameId;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    // Get DOM elements
    wordInput = document.getElementById("word-input");
    wordDisplay = document.getElementById("word-display");
    typedWordDisplay = document.getElementById("typed-word-display");
    startButton = document.getElementById("start-button");
    difficultySelect = document.getElementById("difficulty-select");

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };

    cactusImg = new Image();
    cactusImg.src = "./img/cactus1.png";

    // Add event listeners
    wordInput.addEventListener("input", handleTyping);
    startButton.addEventListener("click", startGame);
    difficultySelect.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
    });
};

function startGame() {
    // Stop any existing game loops
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    clearInterval(cactusInterval);

    // Reset game state
    gameOver = false;
    score = 0;
    cactusArray = [];
    dino.y = dinoY;
    velocityY = 0;
    readyToJump = false;

    // Reset velocity and jump settings based on current difficulty
    velocityX = difficultySettings[currentDifficulty].speed;
    dino.jumpVelocity = difficultySettings[currentDifficulty].jumpVelocity;
    dino.jumpThreshold = difficultySettings[currentDifficulty].jumpThreshold;

    // Reset UI elements
    startButton.style.display = "none";
    difficultySelect.disabled = true;
    wordInput.value = "";
    wordInput.disabled = false;
    wordInput.focus();

    // Start the game loop and cactus spawn interval
    animationFrameId = requestAnimationFrame(update);
    cactusInterval = setInterval(placeCactus, difficultySettings[currentDifficulty].spawnInterval);
    spawnWord();

    dinoImg.src = "./img/dino.png";
}

function update() {
    // Set the animation frame ID each time `update` is called
    animationFrameId = requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Apply gravity and move the dino based on the calculated velocityY
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // Handle jumping when the word is correctly typed
    if (readyToJump && dino.y === dinoY) {
        let nearestCactus = findNearestCactus();
            
        if (nearestCactus && nearestCactus.x > dino.x && nearestCactus.x <= dino.jumpThreshold) {
            // Only jump if the cactus is ahead of the dino and within jump threshold
            velocityY = dino.jumpVelocity;
            readyToJump = false;
            spawnWord();
        }
    }

    // Update cactus positions and draw them
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;  // Use the cactus speed from the difficulty settings
        context.drawImage(cactusImg, cactus.x, cactus.y, cactusWidth, cactusHeight);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            endGame();
        }
    }

    // Remove off-screen cactuses
    cactusArray = cactusArray.filter(cactus => cactus.x > -cactusWidth);

    // Draw score
    context.fillStyle = "black";
    context.font = "20px courier";
    context.fillText(score, 5, 20);
}



function findNearestCactus() {
    return cactusArray.reduce((nearest, current) => {
        if (!nearest) return current;
        if (current.x < nearest.x && current.x > dino.x) return current;
        return nearest;
    }, null);
}

function spawnWord() {
    const dictionary = wordDictionaries[currentDifficulty];
    
    // Pick a new word that is not the same as the previous one
    let newWord;
    do {
        newWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    } while (newWord === previousWord);  // Check if the new word is the same as the previous one
    
    currentWord = newWord;  // Update the current word
    previousWord = currentWord;  // Store the current word as the previous word

    wordDisplay.innerText = `Type the word: ${currentWord}`;
    wordInput.value = "";
    typedWordDisplay.innerHTML = "";
    readyToJump = false;
}

function handleTyping() {
    const typedWord = wordInput.value;
    let formattedText = "";

    for (let i = 0; i < typedWord.length; i++) {
        if (i < currentWord.length) {
            if (typedWord[i] === currentWord[i]) {
                formattedText += `<span class="correct-letter">${typedWord[i]}</span>`;
            } else {
                formattedText += `<span class="incorrect-letter">${typedWord[i]}</span>`;
            }
        }
    }
    typedWordDisplay.innerHTML = formattedText;

    if (typedWord === currentWord) {
        score += 50;
        readyToJump = true;
        wordInput.value = "";
        typedWordDisplay.innerHTML = "";
    }
}

function placeCactus() {
    if (gameOver) {
        return;
    }

    let cactus = {
        x: cactusX,
        y: cactusY,
        width: cactusWidth,
        height: cactusHeight
    };

    cactusArray.push(cactus);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function endGame() {
    gameOver = true;
    wordDisplay.innerText = "Game Over! Click 'Start Game' to play again.";
    wordInput.disabled = true;
    typedWordDisplay.innerHTML = "";
    startButton.style.display = "block";
    difficultySelect.disabled = false;

    // Stop the animation loop
    cancelAnimationFrame(animationFrameId);
    clearInterval(cactusInterval);
}

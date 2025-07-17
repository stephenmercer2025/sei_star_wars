document.getElementById('start-game').addEventListener('click', function() {
    // Start game logic
    document.getElementById('winner').innerText = '';
    
    // Initialize health bars and scores
    document.getElementById('alien-health').style.width = '100%';
    document.getElementById('human-health').style.width = '100%';
    document.getElementById('alien-score').innerText = '0';
    document.getElementById('human-score').innerText = '0';
    
    // Start random attacks (game play happens automatically)
    startRandomAttacks();
});

document.getElementById('restart-game').addEventListener('click', function() {
    // Restart game logic
    document.getElementById('winner').innerText = '';
    document.getElementById('alien-health').style.width = '100%';
    document.getElementById('human-health').style.width = '100%';
    document.getElementById('alien-score').innerText = '0';
    document.getElementById('human-score').innerText = '0';
    
    // Stop any ongoing random attacks
    clearInterval(randomAttackInterval);
});

let randomAttackInterval;

function startRandomAttacks() {
    // Random attacks trigger every 1-3 seconds
    randomAttackInterval = setInterval(function() {
        let randomAttack = Math.random();
        
        // 20% chance for blocked attack
        if (randomAttack < 0.2) {
            blockAttack(); // Trigger blocked attack
        } else if (randomAttack < 0.5) {
            attack('alien'); // Alien attacks human
        } else {
            attack('human'); // Human attacks alien
        }
    }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds
}

function blockAttack() {
    // Change the background of #game to a half-red, half-blue gradient when attack is blocked
    document.getElementById('game').style.background = 'linear-gradient(to right, red 50%, blue 50%)';
    setTimeout(() => {
        // Reset to black background after 0.5s
        document.getElementById('game').style.background = 'black';
    }, 500);

    // No points are awarded for blocked attacks
    console.log("Attack blocked! No points awarded.");
}

function attack(attacker) {
    if (attacker === 'alien') {
        // Alien attacks human
        let humanHealth = document.getElementById('human-health');
        let currentHealth = parseInt(humanHealth.style.width);
        
        if (currentHealth > 0) {
            currentHealth -= 5; // Decrease health by 5
            humanHealth.style.width = currentHealth + '%';
            updateScore('alien'); // Update Alien's score

            // Change the background of #game to red when alien hits
            document.getElementById('game').style.backgroundColor = 'red'; // Target #game element
            setTimeout(() => {
                document.getElementById('game').style.backgroundColor = 'black'; // Reset to black after 0.5s
            }, 500);

            if (currentHealth <= 0) {
                document.getElementById('winner').innerText = 'I have brought peace, freedom, justice, and security to my new empire.';
                document.getElementById('winner').style.fontSize = '20px'; // Make text smaller
                clearInterval(randomAttackInterval); // Stop game
            }
        }
    } else if (attacker === 'human') {
        // Human attacks alien
        let alienHealth = document.getElementById('alien-health');
        let currentHealth = parseInt(alienHealth.style.width);
        
        if (currentHealth > 0) {
            currentHealth -= 5; // Decrease health by 5
            alienHealth.style.width = currentHealth + '%';
            updateScore('human'); // Update Human's score

            // Change the background of #game to blue when human hits
            document.getElementById('game').style.backgroundColor = 'blue'; // Target #game element
            setTimeout(() => {
                document.getElementById('game').style.backgroundColor = 'black'; // Reset to black after 0.5s
            }, 500);

            if (currentHealth <= 0) {
                document.getElementById('winner').innerText = 'You were the chosen one! It was said that you would destroy the Sith, not join them! Bring balance to the Force, not leave it in darkness!';
                document.getElementById('winner').style.fontSize = '20px'; // Make text smaller
                clearInterval(randomAttackInterval); // Stop game
            }
        }
    }
}

document.getElementById('start-game').addEventListener('click', function() {
    var audio = document.getElementById('theme-song');
    audio.play();  // Start the Star Wars theme music
});

function updateScore(attacker) {
    if (attacker === 'alien') {
        let currentScore = parseInt(document.getElementById('alien-score').innerText);
        document.getElementById('alien-score').innerText = currentScore + 1;
    } else if (attacker === 'human') {
        let currentScore = parseInt(document.getElementById('human-score').innerText);
        document.getElementById('human-score').innerText = currentScore + 1;
    }
}


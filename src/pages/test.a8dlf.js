<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puhka ja Mängi</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body { 
            font-family: 'Poppins', sans-serif; 
            text-align: center; 
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center; 
            justify-content: center; 
            position: relative;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                /* Gradient circles */
                radial-gradient(circle at 50% 50%, 
                    rgba(255,255,255,0.3) 0%, 
                    rgba(255,255,255,0.2) 30%,
                    rgba(255,255,255,0.1) 50%,
                    transparent 70%
                ),
                /* Vertical stripes */
                linear-gradient(90deg,
                    rgba(255,255,255,0.08) 0%,
                    rgba(255,255,255,0.08) 2px,
                    transparent 2px,
                    transparent 40px,
                    rgba(255,255,255,0.08) 40px,
                    rgba(255,255,255,0.08) 42px,
                    transparent 42px,
                    transparent 80px
                );
            background-size: 
                800px 800px,
                160px 100%;
            background-position: 
                0 0,
                0 0;
            pointer-events: none;
            z-index: 1;
            animation: Stripes 40s diagonal infinite;
        }

        @keyframes floralStripes {
            0% {
                background-position: 
                    0 0,
                    0 0;
            }
            100% {
                background-position: 
                    0 400px,
                    0 0;
            }
        }

        .container {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .music-toggle {
            position: fixed;  /*Fixed position to stay in the upper right corner */
            top: 20px;
            right: 20px;
            z-index: 10; /* Ensure it appears above other elements */
            width: 40px;
            height: 40px;
            border: 1px;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            /*display: flex;*/
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
        }

        .music-toggle::before {
            content: '♪';
            font-size: 28px;
            color: rgba(255, 255, 255, 0.8);
            text-shadow: 0 0 10px rgba(255, 192, 203, 0.4);
            transition: all 0.3s ease;
        }

        .music-toggle:hover::before {
            transform: scale(1.1);
            color: white;
            text-shadow: 
                0 0 15px rgba(255, 192, 203, 0.6),
                0 0 30px rgba(255, 192, 203, 0.4);
        }

        .music-toggle.playing::before {
            animation: musicFloat 2s ease-in-out infinite;
        }

        @keyframes musicFloat {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-3px) rotate(10deg);
            }
        }

        .activities-container {
            display: flex;
            flex-direction: row; /* Arrange cards side by side */
            justify-content: center;
            align-items: flex-start; /* Align items to the start */
            height: auto; /* Allow height to adjust based on content */
            width: 100%; /* Fill the container width */
            gap: 40px;
            margin-bottom: 30px;
            flex-wrap: nowrap;
        }

        .section {
            display: flex;
            flex-direction: column;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            flex: 0 0 420px;
            width: 420px;
            min-width: 420px;
            min-height: fit-content;
        }

        .activity-card {
            background: #ffffff; /* Change background color to white */
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            width: 300px; /* Adjust width if necessary */
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            perspective: 1000px;
            transition: transform 0.3s ease;
            margin: 25px;
        }

        .activity-card.flip {
            transform: rotateX(360deg);
        }

        .activity-card p {
            font-size: 20px; /* Increased font size by 2px */
        }

        .activity-card p.counter {
            margin-top: 20px; /* Move the Tegevusi: text 20px below the card */
        }

        button {
            background: linear-gradient(45deg, #FF6B6B, #FFE66D);
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-top: -40px; /* Move buttons 20px higher */
            z-index: 10
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        button:active {
            transform: translateY(1px);
        }

        .timer-button {
            background: linear-gradient(45deg, #FF6B6B, #FFE66D);
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-top: 20px; /* Adjusted margin */
        }

        .timer-section {
            margin-top: -20px; /* Move timer 20px higher */
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .timer-container {
            position: relative;
            width: 96px;
            height: 96px;
            margin-bottom: 15px;
        }

        .timer-circle {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }

        .timer-circle-bg {
            fill: none;
            stroke: rgba(255, 255, 255, 0.3);
            stroke-width: 8;
        }

        .timer-circle-progress {
            fill: none;
            stroke: white;
            stroke-width: 8;
            stroke-linecap: round;
            transition: stroke-dashoffset 0.3s ease;
        }

        .timer-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            color: white;
        }

        .checkmark {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
        }

        .checkmark-circle {
            stroke: white;
            stroke-width: 2;
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
            stroke: white;
            stroke-width: 2;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes stroke {
            100% {
                stroke-dashoffset: 0;
            }
        }

        .counter {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 10px;
        }

        div {
            border: none; /* Remove borders from all divs */
        }
    </style>
</head>
<body>
    <button class="music-toggle" onclick="toggleMusic()">♪</button>
    <div class="container">
        <div class="activities-container">
            <div class="section">
                <div class="activity-card">
                    <p id="activity-display">Tõmba hinge</p>
                </div>
                <button onclick="getRandomActivity('media')">Puhka</button>
                <p class="counter">Tegevusi: <span id="media-counter">0</span></p>
            </div>
            <div class="section">
                <div class="activity-card">
                    <p id="child-activity-display">Mängi lapsega</p>
                </div>
                <button onclick="getRandomActivity('child')">Mängi</button>
                <p class="counter">Tegevusi: <span id="child-counter">0</span></p>
            </div>
        </div>
        <div class="timer-section">
            <div class="timer-container">
                <svg class="timer-circle" viewBox="0 0 100 100">
                    <circle class="timer-circle-bg" cx="50" cy="50" r="45"></circle>
                    <circle class="timer-circle-progress" cx="50" cy="50" r="45"></circle>
                </svg>
                <div class="timer-text" id="timer-text">20:00</div>
            </div>
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <button class="timer-button" onclick="toggleTimer()">Alusta!</button>
        </div>
    </div>

    <!-- Audio elements -->
    <audio id="buttonSound" preload="auto">
        <source src="https://www.soundjay.com/button/button-09a.mp3" type="audio/mpeg">
    </audio>
    <audio id="timerSound" preload="auto">
        <source src="https://www.soundjay.com/button/button-35.mp3" type="audio/mpeg">
    </audio>
    <audio id="playSound" preload="auto">
        <source src="giggling-6799.mp3" type="audio/mpeg">
    </audio>
    <audio id="relaxSound" preload="auto">
        <source src="female-giggling-a-bit-subdued-64220.mp3" type="audio/mpeg">
    </audio>
    <audio id="backgroundMusic" preload="auto" loop>
        <source src="happy-relaxing-loop-275487.mp3" type="audio/mpeg">
    </audio>

    <script>
        const TOTAL_TIME = 1200; // 20 minutes in seconds
        const CIRCUMFERENCE = 2 * Math.PI * 45;
        let timerInterval = null;
        let timeLeft = TOTAL_TIME;
        let activityCount = { media: 0, child: 0 };
        let lastIndices = { media: -1, child: -1 };
        let isPlayingSoundEffect = false;

        const timerText = document.getElementById('timer-text');
        const progressCircle = document.querySelector('.timer-circle-progress');
        const checkmark = document.querySelector('.checkmark');
        const startButton = document.querySelector('.timer-button');
        
        progressCircle.style.strokeDasharray = CIRCUMFERENCE;
        progressCircle.style.strokeDashoffset = CIRCUMFERENCE;

        // Audio elements
        const buttonSound = document.getElementById('buttonSound');
        const timerSound = document.getElementById('timerSound');
        const playSound = document.getElementById('playSound');
        const relaxSound = document.getElementById('relaxSound');
        const backgroundMusic = document.getElementById('backgroundMusic');

        // Set background music volume and start playing
        backgroundMusic.volume = 0.4;
        let isMusicPlaying = true;

        // Initialize and play background music
        function initBackgroundMusic() {
            backgroundMusic.play().then(() => {
                document.querySelector('.music-toggle').classList.add('playing');
            }).catch(e => console.log("Background music failed to start:", e));
        }

        // Toggle background music
        function toggleMusic() {
            const musicButton = document.querySelector('.music-toggle');
            if (isMusicPlaying) {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
            } else {
                backgroundMusic.play();
                musicButton.classList.add('playing');
            }
            isMusicPlaying = !isMusicPlaying;
        }

        // Function to play a sound effect once with fade-out
        function playSoundEffect(sound) {
            if (!isPlayingSoundEffect) {
                isPlayingSoundEffect = true;
                sound.currentTime = 0;
                sound.volume = 1;
                
                const fadeOut = () => {
                    let volume = sound.volume;
                    const fadeInterval = setInterval(() => {
                        if (volume > 0.1) {
                            volume = Math.max(0, volume - 0.15);
                            sound.volume = volume;
                        } else {
                            clearInterval(fadeInterval);
                            sound.pause();
                            sound.currentTime = 0;
                            sound.volume = 1;
                            isPlayingSoundEffect = false;
                        }
                    }, 30);
                };

                // Start fade out after 1 second
                const soundTimeout = setTimeout(fadeOut, 1000);

                sound.play()
                    .then(() => {
                        sound.addEventListener('ended', () => {
                            clearTimeout(soundTimeout);
                            sound.volume = 1;
                            isPlayingSoundEffect = false;
                        }, { once: true });
                    })
                    .catch(e => {
                        console.log("Audio play failed:", e);
                        clearTimeout(soundTimeout);
                        sound.volume = 1;
                        isPlayingSoundEffect = false;
                    });
            }
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function updateTimer() {
            timeLeft--;
            timerText.textContent = formatTime(timeLeft);
            
            const progress = (TOTAL_TIME - timeLeft) / TOTAL_TIME;
            progressCircle.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerText.style.display = 'none';
                checkmark.style.display = 'block';
                startButton.textContent = 'Alusta!';
                playSoundEffect(timerSound);
            }
        }

        function toggleTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.textContent = 'Alusta!';
                timeLeft = TOTAL_TIME;
                timerText.textContent = formatTime(timeLeft);
                progressCircle.style.strokeDashoffset = CIRCUMFERENCE;
                checkmark.style.display = 'none';
                timerText.style.display = 'block';
            } else {
                startButton.textContent = 'Peata';
                timerInterval = setInterval(updateTimer, 1000);
            }
            playSoundEffect(buttonSound);
        }

        const activities = {
            media: [
                "Mine 10-minutilisele jalutuskäigule ilma telefonita",
                "Tee 5 minutit venitusharjutusi",
                "Joo klaas vett ja hinga 10 korda sügavalt sisse-välja",
                "Vaata 5 minutit aknast välja ja märka 5 erinevat asja",
                "Kirjuta paberile 3 tänulikku mõtet",
                "Tee 5-minutiline meditatsioonipaus",
                "Korista oma töölaud või ümbrus",
                "Tee 10 kükki või muud lihtsat harjutust",
                "Loe 5 minutit raamatut",
                "Joonista midagi 5 minutit"
            ],
            child: [
                "Mängige koos peitust",
                "Joonistage koos pilt",
                "Tehke koos 5 minutit tantsupausi",
                "Mängige koos plaksumängu",
                "Lugege koos raamatut",
                "Ehitage koos midagi klotsidest",
                "Mängige rollimängu",
                "Tehke koos naljakaid nägusid",
                "Laulge koos mõnda laulu",
                "Mängige 'Mis on kotis?' kompimismängu"
            ]
        };

        function getRandomActivity(type) {
            if (type === 'child') {
                playSoundEffect(playSound);
            } else {
                playSoundEffect(relaxSound);
            }
            
            const activityList = activities[type];
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * activityList.length);
            } while (randomIndex === lastIndices[type] && activityList.length > 1);
            
            lastIndices[type] = randomIndex;
            
            const displayId = type === 'media' ? 'activity-display' : 'child-activity-display';
            const card = document.querySelector(`#${displayId}`).closest('.activity-card');
            const text = document.getElementById(displayId);
            
            card.classList.add('flip');
            
            setTimeout(() => {
                text.innerText = activityList[randomIndex];
                activityCount[type]++;
                document.getElementById(`${type}-counter`).innerText = activityCount[type];
                
                requestAnimationFrame(() => {
                    card.classList.remove('flip');
                });
            }, 150);
        }

        // Start background music when page is interacted with
        document.addEventListener('click', function initAudio() {
            initBackgroundMusic();
            document.removeEventListener('click', initAudio);
        }, { once: true });
    </script>
</body>
</html>

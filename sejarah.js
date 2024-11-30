document.addEventListener('DOMContentLoaded', () => {
    const quizQuestions = [
        {
            question: "Siapa yang memproklamirkan kemerdekaan Indonesia?",
            image: "soekarno.jpg",
            answers: [
                { text: "Soekarno", correct: true },
                { text: "Suharto", correct: false },
                { text: "Jokowi", correct: false },
                { text: "Habibie", correct: false }
            ]
        },
        {
            question: "Tahun berapa Indonesia merdeka?",
            image: "754b8ae3-8e6d-4873-af26-8de09c0886ea.jpg",
            answers: [
                { text: "1945", correct: true },
                { text: "1949", correct: false },
                { text: "1950", correct: false },
                { text: "1965", correct: false }
            ]
        },
        {
            question: "Apa nama kerajaan Islam pertama di Indonesia?",
            image: "9f6dae9de3d337f19d984c01c00ec183.jpg",
            answers: [
                { text: "Samudra Pasai", correct: true },
                { text: "Majapahit", correct: false },
                { text: "Sriwijaya", correct: false },
                { text: "Mataram", correct: false }
            ]
        },
        {
            question: "Siapa penulis buku *Indonesia Menggugat*?",
            image: "4d4e595d5ed5ce0e8dbde1209a1bd00f.jpg",
            answers: [
                { text: "Soekarno", correct: true },
                { text: "Hatta", correct: false },
                { text: "Kartini", correct: false },
                { text: "Tan Malaka", correct: false }
            ]
        },
        {
            question: "Siapa tokoh yang dikenal sebagai Bapak Pendidikan Indonesia?",
            image: "download.jpg",
            answers: [
                { text: "Ki Hajar Dewantara", correct: true },
                { text: "Soepomo", correct: false },
                { text: "Dewi Sartika", correct: false },
                { text: "Moh. Yamin", correct: false }
            ]
        },
        {
            question: "Dimana lokasi Sumpah Pemuda diikrarkan?",
            image: "teks-sumpah-pemuda-28-oktober-1928-asli.jpg",
            answers: [
                { text: "Jakarta", correct: true },
                { text: "Surabaya", correct: false },
                { text: "Yogyakarta", correct: false },
                { text: "Bandung", correct: false }
            ]
        },
        {
            question: "Apa nama kapal yang membawa teks proklamasi ke RRI?",
            image: "cae8efba613749e9e46d3b56c78b62df.jpg",
            answers: [
                { text: "Kapal Himeji", correct: true },
                { text: "Kapal Sekutu", correct: false },
                { text: "Kapal Yamato", correct: false },
                { text: "Kapal Bung Tomo", correct: false }
            ]
        },
        {
            question: "Siapa yang mendirikan Budi Utomo?",
            image: "1c91d6495f461f13c1bd2fb3018e55fb.jpg",
            answers: [
                { text: "Dr. Wahidin Sudirohusodo", correct: true },
                { text: "Haji Agus Salim", correct: false },
                { text: "Soetomo", correct: false },
                { text: "Sukarno", correct: false }
            ]
        },
        {
            question: "Kapan Hari Pahlawan diperingati?",
            image: "hari_pahlawan.jpg",
            answers: [
                { text: "10 November", correct: true },
                { text: "17 Agustus", correct: false },
                { text: "20 Mei", correct: false },
                { text: "28 Oktober", correct: false }
            ]
        },
        {
            question: "Siapa tokoh utama pertempuran Surabaya 1945?",
            image: "bung_tomo.jpg",
            answers: [
                { text: "Bung Tomo", correct: true },
                { text: "Soekarno", correct: false },
                { text: "Sudirman", correct: false },
                { text: "Hatta", correct: false }
            ]
        }
    ];

    const puzzles = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ];

    let currentPuzzleIndex = 0;
    let puzzlePieces = [];
    let emptyPieceIndex = 0;

    const puzzleContainer = document.getElementById('puzzle-container');
    const startPuzzleButton = document.getElementById('start-puzzle');
    const puzzleNotification = document.getElementById('puzzle-notification');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const totalTime = 15;

    const questionContainer = document.getElementById('question-container');
    const scoreValue = document.getElementById('score-value');
    const timeValue = document.getElementById('time');
    const startQuizButton = document.getElementById('start-quiz');
    const nextButton = document.getElementById('next-button');

    // Puzzle Event Listeners
    startPuzzleButton.addEventListener('click', startPuzzle);

    // Quiz Event Listeners
    startQuizButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(quizQuestions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    });

    function startPuzzle() {
        // Temukan elemen gambar awal
        const puzzleImage = document.getElementById('puzzle-image');
    
        // Sembunyikan gambar awal jika ditemukan
        if (puzzleImage) {
            puzzleImage.style.display = 'none'; // Sembunyikan gambar dengan display: none
        }
    
        // Logika permainan puzzle
        puzzleNotification.classList.add('hidden');
        puzzlePieces = shufflePuzzle([...puzzles[currentPuzzleIndex]]);
        emptyPieceIndex = puzzlePieces.indexOf(9); // Index dari potongan kosong
        renderPuzzle();
        nextPuzzleButton.style.display = 'none'; // Sembunyikan tombol lanjut
    }
    
    console.log(puzzleImage); // Cek apakah elemen berhasil ditemukan
    
    

    function shufflePuzzle(puzzle) {
        for (let i = puzzle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
        }
        return puzzle;
    }

    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        puzzlePieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('puzzle-piece');
            pieceElement.style.order = index;
    
            if (piece !== 9) {
                // Set gambar sebagai latar belakang
                pieceElement.style.backgroundImage = `url('images/puzzle-${piece}.jpg')`;
                pieceElement.style.backgroundSize = 'cover';
                pieceElement.style.backgroundPosition = 'center';
    
                // Tambahkan overlay angka jika diperlukan
                const numberOverlay = document.createElement('span');
                numberOverlay.classList.add('number-overlay');
                numberOverlay.innerText = piece;
                pieceElement.appendChild(numberOverlay);
    
                // Event listener untuk memindahkan potongan
                pieceElement.addEventListener('click', () => movePiece(index));
            } else {
                pieceElement.classList.add('empty-piece'); // Potongan kosong tanpa gambar
            }
    
            puzzleContainer.appendChild(pieceElement);
        });
    }
    
    

    function movePiece(index) {
        const validMoves = getValidMoves();
        if (validMoves.includes(index)) {
            [puzzlePieces[emptyPieceIndex], puzzlePieces[index]] = [puzzlePieces[index], puzzlePieces[emptyPieceIndex]];
            emptyPieceIndex = index;
            renderPuzzle();

            if (isPuzzleSolved()) {
                puzzleNotification.innerText = "Selamat! Puzzle selesai!";
                puzzleNotification.classList.remove('hidden');
                startPuzzleButton.style.display = 'none';
            }
        }
    }

    function getValidMoves() {
        const validMoves = [];
        const row = Math.floor(emptyPieceIndex / 3);
        const col = emptyPieceIndex % 3;

        if (row > 0) validMoves.push(emptyPieceIndex - 3);
        if (row < 2) validMoves.push(emptyPieceIndex + 3);
        if (col > 0) validMoves.push(emptyPieceIndex - 1);
        if (col < 2) validMoves.push(emptyPieceIndex + 1);

        return validMoves;
    }

    function isPuzzleSolved() {
        return puzzlePieces.every((piece, index) => piece === index + 1 || (piece === 9 && index === 8));
    }

    function startQuiz() {
        document.getElementById('quiz-image').classList.add('hidden'); // Sembunyikan gambar
        score = 0;
        currentQuestionIndex = 0;
        scoreValue.innerText = score;
        startQuizButton.style.display = 'none';
        nextButton.style.display = 'none';
        showQuestion(quizQuestions[currentQuestionIndex]);
    }
    

    function showQuestion(question) {
        clearInterval(timer);
        questionContainer.innerHTML = '';

        const questionText = document.createElement('h3');
        questionText.innerText = question.question;
        questionContainer.appendChild(questionText);

        const heroImage = document.createElement('img');
        heroImage.src = question.image;
        heroImage.alt = "Gambar terkait";
        heroImage.style.width = '100%';
        heroImage.style.borderRadius = '10px';
        questionContainer.appendChild(heroImage);

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer, button));
            questionContainer.appendChild(button);
        });

        startTimer();
    }

    function selectAnswer(answer, button) {
        clearInterval(timer);
        const correct = answer.correct;

        if (correct) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('wrong');
        }

        scoreValue.innerText = score;
        disableAnswerButtons();

        if (currentQuestionIndex < quizQuestions.length - 1) {
            nextButton.style.display = 'block';
        } else {
            endQuiz();
        }
    }

    function disableAnswerButtons() {
        const buttons = questionContainer.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function startTimer() {
        clearInterval(timer);
        let timeLeft = totalTime;
        timeValue.innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timeValue.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                nextButton.style.display = 'block';
                disableAnswerButtons();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        startQuizButton.style.display = 'block';
        nextButton.style.display = 'none';
        questionContainer.innerHTML = '<h3>Kuis selesai! Terima kasih telah bermain.</h3>';
    }
    function startPuzzle() {
        puzzleNotification.classList.add('hidden');
        puzzlePieces = shufflePuzzle([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Susunan awal dengan angka 1-9
        emptyPieceIndex = puzzlePieces.indexOf(9); // Temukan potongan kosong
        renderPuzzle();
    }
    
});

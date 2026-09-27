const steps = [
    // Slide 0 - New Intro Message (Image)
    {
        type: 'message',
        image: "assets/my_intro_image.png", // Custom Image 1
        text: "Hey, I have something special for you! It might take a moment, so would you mind sparing a few minutes for me?",
        btnText: "Of Course!"
    },
    // Slide 1 (Original 0)
    {
        type: 'joke',
        question: "What did one leaf say to the other?",
        answer: "I'm falling for you!",
        image: "assets/falling_leaf.png", 
        btnText: "Tell Me!",
        nextBtnText: "Next"
    },
    // Slide 2 (Original 1)
    {
        type: 'joke',
        question: "Why did the cactus cross the road?",
        answer: "Because it was stuck on you!",
        image: "assets/cactus_hug.png", 
        btnText: "Tell Me!",
        nextBtnText: "Next"
    },
    // Slide 3 (Original 2)
    {
        type: 'joke',
        question: "What's a flower's favorite type of story?",
        answer: "A budding romance!",
        image: "assets/flower_bud.png", 
        btnText: "Tell Me!",
        nextBtnText: "Next"
    },
    // Slide 4 (Original 3) - Transition (Image Replaced)
    {
        type: 'message',
        image: "assets/heart_transition.png", // Custom Image 2 (Heart)
        text: "Before we continue... there's something I need to tell you.",
        btnText: "I'm Listening..."
    },
    // Slide 5 (Original 4) - Deepening (Image Replaced)
    {
        type: 'message',
        image: "assets/spa_transition.png",
        text: "Please bear with me for just a moment... and hear me out. I've mustered all my courage to do this.<br><br><span style='font-size:0.9em; opacity:0.8; font-weight:400;'>This is important to me... and you mean everything.</span>",
        btnText: "I'm Here For You"
    },
    {
        type: 'message',
        image: "assets/envelope_transition.png", 
        text: "I've poured my heart into something special",
        btnText: "I'd Love To Read It"
    },    
    {type: 'letter'}
];

let currentStepIndex = 0;
const card = document.getElementById('mainCard');

function renderStep(index) {
    const step = steps[index];
    card.innerHTML = ''; // Clear card
    card.classList.remove('fade-in');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('fade-in');
    
    // Logic to update/hide dots removed

    if (step.type === 'joke') {
        renderJoke(step);
    } else if (step.type === 'message') {
        renderMessage(step);
    } else if (step.type === 'letter') {
        renderLetter();
    }
}

function renderJoke(step) {
    // Question
    const qEl = document.createElement('h2');
    qEl.className = 'content-question';
    qEl.textContent = step.question;

    // Reveal Content Container
    const revealContainer = document.createElement('div');
    revealContainer.className = 'reveal-content';

    // Answer
    const aEl = document.createElement('h3');
    aEl.className = 'content-answer';
    aEl.textContent = step.answer;
    revealContainer.appendChild(aEl);
    
    // Image (if provided)
    if (step.image) {
        const imgEl = document.createElement('img');
        imgEl.src = step.image;
        imgEl.alt = step.answer.replace(/[^a-zA-Z0-9 ]/g, "").trim(); // Simple alt text cleanup
        imgEl.className = 'answer-image';
        revealContainer.appendChild(imgEl);
    }

    // Button Container
    const btnContainer = document.createElement('div');

    // Reveal Button
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerHTML = `${step.btnText} <i class="fa-solid fa-chevron-down"></i>`;
    
    btn.onclick = () => {
        revealContainer.classList.add('visible');
        // Use a slight timeout to ensure the content is visible before the button changes
        setTimeout(() => {
            btn.innerHTML = `${step.nextBtnText} <i class="fa-solid fa-arrow-right"></i>`;
            btn.onclick = nextStep; // Change button action to next step
        }, 300); 
    };

    btnContainer.appendChild(btn);
    card.appendChild(qEl);
    card.appendChild(revealContainer);
    card.appendChild(btnContainer);
}

// Updated renderMessage function
function renderMessage(step) {
    // Check for image first
    if(step.image) {
        const imgEl = document.createElement('img');
        imgEl.src = step.image;
        imgEl.alt = "Transition image"; 
        
        // Use 'intro-image' for the very first step (index 0) to keep its distinct class
        if (currentStepIndex === 0) {
                imgEl.className = 'intro-image fade-in';
        } else {
                // Use 'message-image' for all subsequent message slides - now circular
                imgEl.className = 'message-image fade-in';
        }

        card.appendChild(imgEl);
    } 
    // Then check for icon (fallback for unreplaced icons)
    else if(step.icon) {
        const icon = document.createElement('i');
        icon.className = `${step.icon} transition-icon`;
        card.appendChild(icon);
    }

    // Text
    const textEl = document.createElement('div');
    textEl.className = 'content-question';
    textEl.style.fontSize = "1.35rem";
    textEl.style.fontWeight = "400";
    textEl.innerHTML = step.text;

    // Button
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerHTML = `${step.btnText} <i class="fa-solid fa-check"></i>`;
    btn.onclick = nextStep;

    card.appendChild(textEl);
    card.appendChild(btn);
}

function renderLetter() {
    // Container for letter content
    const div = document.createElement('div');
    div.className = 'letter-container';

    div.innerHTML = `
        <i class="fa-solid fa-quote-left letter-decor decor-tl"></i>
        <i class="fa-solid fa-quote-right letter-decor decor-br"></i>

        <h2 class="letter-greeting">My Dearest bespren,</h2>
        
        <p class="letter-body">
            In this beautiful journey we share, you've become my safe harbor..
        </p>
        <p class="letter-body">
           I also want to say sorry for the things I’ve done and for the times my actions may have hurt you. I know that sometimes I let my emotions get the best of me, and I’m truly sorry if I made things difficult or made you feel like our friendship wasn’t safe. I never wanted to hurt you or make you question how much I value you.
        </p>
        <p class="letter-body">
           Through every laugh, every late-night conversation, every little memory, and even the difficult days, I hope we never lose what makes this bond so special. You are someone I can be myself with, someone I can always come home to, and someone I’m grateful to have in my life.
        </p>
        <p class="letter-body">
            You mean so much to me paks, and I hope you know that despite everything, I’m still grateful for every moment, every laugh, and every memory we’ve shared. I may not always handle things perfectly, but I’ll always appreciate you and the bond we have. I’m sorry paks, and I hope we can continue out friendship I may not always handle things perfectly, but I’ll always appreciate you and the bond we have. I’m truly sorry for my actions, and I sincerely hope you can accept my apology. ❤️
        </p>

        <div class="letter-signoff">
            <span class="signoff-text">With all my heart,</span>
            <span class="signoff-signature">bespren</span>
        </div>
    `;

    card.appendChild(div);
}

function nextStep() {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderStep(currentStepIndex);
    }
}

// Initialize as soon as the local HTML is parsed; external stylesheets may still be loading.
document.addEventListener('DOMContentLoaded', () => {
    renderStep(0);
}, { once: true });
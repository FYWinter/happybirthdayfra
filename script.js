var choicesDiv = document.getElementById("choices");
var indicatorText = document.getElementById("page-indicator");
var fraDiv = document.getElementById("fra-image");
var book = document.getElementById("book");
var page = 1;
var max_pages = 15;
var glitch_level = 0;
var glitch_speed = 4;

var bg_glitch_interval = setInterval(createGlitchSquare, 1000);
var eyes_interval = setInterval(createGlitchEyes, 70);

var specialPages = [
    { name: "bright", state: 0, threshold: 3, options: ["Bright"] }, // State: 0 = not used, 1 = currently active, 2 = used
    { name: "small", state: 0, threshold: 6, options: ["Small", "Tiny", "Short"] }
];

function randomWordsHTML() {
    var wrong_words = [ "Italian", 
                    "Tall", 
                    "Sorry",
                    "Black",
                    "Bubbly",
                    "Alone",
                    "Lesbian",
                    "Wavy",
                    "Bass",
                    "Wraith-Spotting",
                    "Eyesight",
                    "Two-eyes",
                    "Dad Lover",
                    "Fluffy"];

    var right_words = [ "French", 
                    "Short", 
                    "Stars",
                    "Slay",
                    "Bisexual",
                    "Purple",
                    "Generator",
                    "Doctor",
                    "Friends",
                    "Teacher",
                    "English",
                    "Eyeliner",
                    "Nails",
                    "Furry",
                    "Capricorn",
                    "Unique",
                    "Nerdy"];


    var right_words_remaining = 3;
    var specialPage = -1;

    // Special pages
    for (var j = 0; j < specialPages.length; j++)
    {
        if ((glitch_level >= specialPages[j].threshold && specialPages[j].state == 0 && Math.random() < 0.2) || specialPages[j].state == 1) // 20% chance of special page
        {
            specialPage = j;
            specialPages[j].state = 1;
            break;
        }
    }

    var html = "";
    for (var i = 0; i < 10; i++)
    {
        var word = "";
        var correct = Math.random() < 0.5 && right_words_remaining > 0 || 10-i <= right_words_remaining
        if (correct)
        {
            rand_index = Math.floor(Math.random() * right_words.length);
            word = right_words[rand_index];
            right_words.splice(rand_index, 1);
            right_words_remaining--;
        }
        else
        {
            rand_index = Math.floor(Math.random() * wrong_words.length);
            word = wrong_words[rand_index];
            wrong_words.splice(rand_index, 1);
        }

        if (specialPage != -1 && specialPages[specialPage].state == 1)
        {
            word = specialPages[specialPage].options[Math.floor(Math.random() * specialPages[specialPage].options.length)];
            correct = true;
        }

        if (page == max_pages) // Special page "loved"
        {
            word = "Loved";
            correct = true;
        }

        html += "<button id=\"btn" + i + "\" onclick='checkChoice(\"" + word + "\", " + correct + ", " + i + ")'>" + word + "</button>";
    }
    return html;
}

function generateChoices() {
    for (var j = 0; j < specialPages.length; j++)
        if (specialPages[j].state == 1)
            specialPages[j].state = 2;
    

    if (page <= max_pages)
    {
        var html = randomWordsHTML();
        indicatorText.innerHTML = page + "/" + max_pages;
        choicesDiv.innerHTML = html;
        return;
    }

    // Undo glitch effects
    glitch_level = 0;
    glitch_speed = 4;
    document.documentElement.style.setProperty('--glitch-intensity', '0px');
    document.documentElement.style.setProperty('--glitch-speed', '4s');
    document.getElementById('glitch_bg').style.backgroundColor = `rgba(55, 5, 5, 0)`; // Reset glitch-bg
    book.style.filter = `brightness(1)`; // Reset book brightness
    clearInterval(bg_glitch_interval); // Reset glitch squares
    choicesDiv.style.display = "block";
    choicesDiv.innerHTML = "<p>HAPPY BIRTHDAY, FRA!! You made it, pookie!!<br/>Despite all the hardships! All the twist and turns! You really persevered and have grown into such an amazing woman💕 And despite those moments where everything feels dark or really scary just know that you are never alone! You are loved and seen and respected and missed and thought about and sought after and the star in our lives!!<br/>HAVE A GREAT DAY WE LOVE YOU YOU TINY FRENCH PERSON!!</p>";
    indicatorText.innerHTML = "♥/∞";
}

function checkChoice(choice, correct, button_index) {
    if (correct)
    {
        page++;
        if (glitch_level > 0)
            glitch_level--;
        jumpToHeight();
        generateChoices();
    }
    else
    {
        button = document.getElementById("btn" + button_index);
        button.style.textShadow = "0 0 5px rgba(35, 0, 8rgba(200, 24, 89, 0.8)";
        button.style.fontFamily = "Glass";
        button.innerHTML = glitchText(choice);
        button.classList.add("glitched");
        if (glitch_level < 20) // Just to be safe and not make everything black
            glitch_level++;
        glitch_speed *= 0.9;
        document.documentElement.style.setProperty('--glitch-intensity', glitch_level + 'px');
        document.documentElement.style.setProperty('--glitch-speed', glitch_speed + 's');

        // Make glitch-bg less transparent as glitch level increases
        document.getElementById('glitch_bg').style.backgroundColor = `rgba(55, 5, 5, ${glitch_level/2 * 0.1})`;
        // Dim book to keep light levels consistent
        book.style.filter = `brightness(${1 - glitch_level/50})`;
        // Slightly increase square creation speed
        clearInterval(bg_glitch_interval);
        bg_glitch_interval = setInterval(createGlitchSquare, 500 - glitch_level * 100);
        

    }
}




function glitchText(text) {
    var glitchChars = ['ͨ', 'ͩ', '̓', '̊', '̑', 'ͥ', '̚', '͆', 'ͮ', '̽', 'ͤ', '́', 'ͦ', '̃', 'ͤ', 'ͦ', '͛', '͑', '̵', '͢', '͞', '̰', '͓', '̭', '̳', '̫', '̪', 'h', '͌', '̋', '̒', 'ͮ', 'ͦ', '́', '̾', '̽', '̇', '̚', '̚', '̐', '̃', 'ͩ', '͑', '͊', 'ͯ', '̡', '̢', '̛', '̬', '̪', '̮', '̮', '̬', '͖', '͚', '̜', '̗', '̰', '̙', '̹', '͖', '̠', '͈', '͖', '1', '̇', '̀', '̅', '̓', '̽', '̄', 'ͨ', 'ͮ', '̀', '͟', '́', '͜', '̀', '̣', '̜', '̪', '̞', '̳', '͔', '͙', '5', '̍', 'ͩ', '͂', '̒', '̏', '̅', 'ͣ', '͋', 'ͥ', 'ͦ', 'ͮ', '̵', '͝', '͜', '̀', '̵', '̤', '̦', '̯', '͖', '͔', '͇', '͕', '͔', '̤', '̱', '̖', '̟', '̙', '͖', '̫', '̜', '̣'];
    var glitchText = '';
    for (var i = 0; i < text.length; i++) {
        glitchText += text[i];
        glitch_random = Math.random();
        if (glitch_random < 0.5) {
            glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
    }
    return glitchText;
}


function jumpToHeight() {
    fraDiv.classList.add('jumping');

    setTimeout(function() {
        fraDiv.classList.remove('jumping');
    }, 500);
}





function createGlitchEyes() {
    if (glitch_level < 4)
        return;

    const character = document.getElementById('fra-image');
    const eyes = document.createElement('div');

    var left_top_base = 30; // Percentage from top
    var left_left_base = 47; // Percentage from left
    var right_top_base = 28; // Percentage from top
    var right_left_base = 73; // Percentage from left

    // Create black squares for eyes
    const leftEye = document.createElement('div');
    const rightEye = document.createElement('div');
    leftEye.classList.add('glitch-eye');
    leftEye.style.top = `${left_top_base + Math.random() * 4}%`;
    leftEye.style.left = `${left_left_base + Math.random() * 4}%`;

    rightEye.classList.add('glitch-eye');
    rightEye.style.top = `${right_top_base + Math.random() * 4}%`;
    rightEye.style.left = `${right_left_base + Math.random() * 4}%`;

    eyes.appendChild(leftEye);
    eyes.appendChild(rightEye);

    character.appendChild(eyes);

    // Remove the square after the animation is complete
    setTimeout(() => {
        character.removeChild(eyes);
    }
    , 100);
}

function createGlitchSquare() {
    if (glitch_level < 2)
        return;

    const glitchBg = document.getElementById('glitch_bg');
    const square = document.createElement('div');
    square.classList.add('glitch-square');

    // Randomize size and position
    const size = Math.random() * 50 + 10; // Size between 10px and 60px
    const top = Math.random() * 100; // Top position between 0% and 100%
    const left = Math.random() * 100; // Left position between 0% and 100%

    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    square.style.top = `${top}%`;
    square.style.left = `${left}%`;

    // Randomize animation duration and delay
    var duration = Math.random() * 1 + 0.2; // Duration between 0.5s and 1.5s
    // Scale duration based on glitch level
    duration *= 1 + glitch_level/10;
    const delay = Math.random() * 2; // Delay between 0s and 2s

    square.style.animationDuration = `${duration}s`;
    square.style.animationDelay = `${delay}s`;

    glitchBg.appendChild(square);

    // Remove the square after the animation is complete
    setTimeout(() => {
        glitchBg.removeChild(square);
    }, (duration + delay) * 1000);
}

// Create glitch squares at random intervals

$(document).ready(function () {


    var secretWordArray = [];
    var secretWord = "";
    var maxWrong = 6;
    var wrongGuesses = 0;
    var underscores = 0;
    var underscoreArray = [];
    var chosenLetter;

    //create random words
    var hangmanWords = [
        "volleyball", "spades", "poker", "survivor", "longevity", "perseverance"
        , "president", "twins", "javascript", "odyssey", "marriage", "selector"
        , "wisconsin", "christianity", "challenge", "expecting", "corona"
    ];


    playGame();
    //event handlers
    $("button").click(clickedLetter);

    //first function start game and get word
    function playGame() {
        //get random secret word
        secretWord = (hangmanWords[Math.floor(Math.random() * hangmanWords.length)]).toUpperCase();
        //make secret word into an array
        secretWordArray = secretWord.split("");

        //get number of letters to replace with underscores
        underscores = secretWord.length;
        for (var i = 0; i < underscores; i++) {
            underscoreArray[i] = "_";
        }
        $("#secretWordOutput").text(underscoreArray.join(" "));
        $("#wrongGuessesOutput").hide();
    }

    //second function get the value a.k.a the letter from the button they clicked
    function clickedLetter() {
        //get the letter from the button that was just clicked
        var buttonClicked = $(this);
        chosenLetter = buttonClicked.val();
        allChosenLetterIndexes(chosenLetter);



        $("#wrongGuessesOutput").text("Wrong Guesses = " + wrongGuesses);
        $("p").hide();
        $("#wrongGuessesOutput").show();

    }

    function allChosenLetterIndexes(chosenLetter) {

        var chosenLetterIndexes = [];
        for (var i = 0; i < secretWordArray.length; i++) {
            if (secretWordArray[i] === chosenLetter) {
                chosenLetterIndexes.push(i);
            }

        }
        replaceUnderscores(chosenLetterIndexes);
    }

    function replaceUnderscores(chosenLetterIndexes) {
        if (chosenLetterIndexes.length !== 0) {
            for (var i = 0; i < chosenLetterIndexes.length; i++) {
                var replaceUnderscore = chosenLetterIndexes[i];
                underscoreArray[replaceUnderscore] = chosenLetter;
            }

        } else {
            //add one to wrong guess
            wrongGuesses++;
        }
        $("#secretWordOutput").text(underscoreArray.join(" "))
        //make sure not to many wrong guesses each time
        gameOver();

    }

    function gameOver() {

        //game over if 6 wrong guessed or secret word is guessed

        //if 6 wrong guesses
        if (wrongGuesses === maxWrong) {
            $("#loser").text("Sorry...but it's time to get LYNCHED!");
            $("#alphabet").hide();
            $("#secretWordOutput").hide();
            $("#wrongGuessesOutput").hide();
            $("p").hide();


        }
        //if secret word is guessed
        if (underscoreArray.join("") === secretWordArray.join("")) {

            $("#winner").html("You have won. <br>You are free to go.");
            $("#alphabet").hide();
            $("#secretWordOutput").hide();
            $("#wrongGuessesOutput").hide();
            $("p").hide();


        }
    }

    //disable buttons they clicked
    $("button").click(function () {
        $(this).addClass("used");
        $(this).prop("disabled", "true");
        var matchFound = false;

        var userGuess = $(this).text();
        for (var i = 0; i < secretWord.length; i++) {
            if (userGuess === secretWord.charAt(i)) {
                $("#winner").find(":nth-child(" + (i + 1) + ")").addClass("winner");
                matchFound = true;
            }
        }


    });

});
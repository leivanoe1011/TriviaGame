

    // Main object where we load the Questions
    var loadContent = $("#load_content");

    // Object where we load the timer
    var timerCountdown = $("#time_remaining");
    
    // Used to store the Interval
    var countdown;

    // Used to load the answers and shuffle them
    var currentAnswers = [];

    // Load Question objects
    var questionsArray = [];

    var workingQuestionsArray = []

    // The timer will always get Index 0 of the Working Questions Array
    var currentIndex = 0;

    var correctAnswers = 0;

    var unanswered = 0;

    var questionCount = 0;

    var wrongAnswer = 0;


    function resetScore(){
        correctAnswers = 0;
        questionCount = 0;
        wrongAnswer = 0;
        unanswered = 0;
    }


    function shuffle(array) {

        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there is remaining elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;

    }


    class QuestionObject  {
        constructor(question,answer1, answer2, answer3, answer4, imageUrl){
            this.question = question,
            this.answer1 = answer1,
            this.answer2 = answer2,
            this.answer3 = answer3,
            this.rightAnswer = answer4
            this.rightAnsImage = imageUrl
            
        }

        // Also I can load the answer received from the HTML here 
        // Then present the user with the answer

        validateAnswer(answer){
            
            if(answer === this.rightAnswer){
                
                return true;
                // return imageUrl;
            }
           
            return false;
        };
        
    }

    let question1 = new QuestionObject("What was the first full length CGI movie?"
        , "A Bug's Life"
        , "Monsters Inc"
        , "The Lion King"
        , "Toy Story"
        , "assets/images/ToyStory.jpeg");

    let question2 = new QuestionObject('Which popular Disney movie featured the song, "Circle of Life"?'
        , "Aladdin"
        , "Hercules"
        , "Mulan"
        , "The Lion King"
        , "assets/images/LionKing.jpeg");

    let question3 = new QuestionObject("Which of these is NOT a name of one of the Spice Girls?"
        , "Sporty Spice"
        , "Scary Spice"
        , "Posh Spice"
        , "Fred Spice"
        , "assets/images/spiceGirls.jpg");


    questionsArray.push(question1);
    questionsArray.push(question2);
    questionsArray.push(question3);



    function removeQuestion(){

        $("#load_content").empty();

    }

    function loadQuestion(questionObject){

        removeQuestion();
        
        var loadContent = $("#load_content");


        var question = '<div class="animate__animated animate__bounce animate__faster">' + questionObject.question + '</div>';


        var answer1 = '<button id="wrong_answer1" class="answer btn btn-light animate__animated animate__bounce animate__faster">' + questionObject.answer1 + '</button> <br>';
        var answer2 = '<button id="wrong_answer2" class="answer btn btn-light animate__animated animate__bounce animate__faster">'+ questionObject.answer2 + '</button> <br>';
        var answer3 = '<button id="wrong_answer3" class="answer btn btn-light animate__animated animate__bounce animate__faster">'+ questionObject.answer3 + '</button> <br>' ;
        var answer4 = '<button id="right_answer" class="answer btn btn-light animate__animated animate__bounce animate__faster">' + questionObject.rightAnswer + '</button> <br>';

    
        $(loadContent).append(question);

        currentAnswers = [];

        currentAnswers.push(answer1);
        currentAnswers.push(answer2);
        currentAnswers.push(answer3);
        currentAnswers.push(answer4);

        // shuffle the answers
        currentAnswers = shuffle(currentAnswers);

        for(var i = 0; i < currentAnswers.length; i++){

            var currentAnswer = currentAnswers[i];
            
            $(loadContent).append(currentAnswer);
        }
    }



    function nextQuestion(){
       
        workingQuestionsArray.splice(currentIndex,1);
        // clearInterval(countdown);

        // Remove question from the Load Content Container
        removeQuestion();

        // clearInterval(countdown);
    }


    // function gets called at the end of the game
    function displayScore(){
        
        removeQuestion();

        // create jQuery html objects
        var startTrivia = $('<button class="btn btn-primary" id="start_game">Start</button>');
        var allDone = $("<div>");
        var correctAns = $("<div>");
        var incorrectAns = $("<div>");
        var unAns = $("<div>");
        var wrongAns = (questionCount - unanswered - correctAnswers);
        var message = $("<div>");
        var lineBreak = $("<br>");
        // wrongAnswer

        // Create score card
        $(allDone).text("All Done, here's how you did!")
        $(correctAns).text("Correct Answers: " + correctAnswers);
        $(incorrectAns).text("Incorrect Answers: " + wrongAns);
        $(unAns).text("Unanswered: " + unanswered);

        $(message).text('"Select Start if you want to restart Trivia game"');

        // load score card
        $(loadContent).append(allDone);
        $(loadContent).append(correctAns);
        $(loadContent).append(incorrectAns);
        $(loadContent).append(unAns);
        
        // create line break
        $(loadContent).append(lineBreak);
        $(loadContent).append(lineBreak);

        // load Restart game message
        $(loadContent).append(message);
        $(loadContent).append(startTrivia);

    }


    // every game will result 
    function displayResult(image,answer=null){
        
        removeQuestion();

        // var result = $("<div>")
        var result = "";

        // $(result).addClass("m-5 d-flex flex-column justify-content-center");

        if(answer){
            result = "You are Correct!";
        }
        else if(answer === false){
            result = "Wrong Answer. Try Again!"
        }
        else{
            result = "NO more time left. Try Again!"
        }


        var img = $("<img>");
        // $(img).addClass("m-5 d-flex flex-column justify-content-center");

        img.attr("src", image);

        console.log(img);

        var resultText = $("<div>").addClass("row");
        resultText.html('<div class="col-lg-12 col-xl-12 d-flex justify-content-center"><p>' + result + '</p></div>');

        var imageResult = $("<div>").addClass("row");
        var imageContainer = $("<div>").addClass("col-lg-12 col-xl-12 d-flex justify-content-center");
        $(imageContainer).append(img);
        $(imageResult).append(imageContainer);

        $(loadContent).append(resultText);
        $(loadContent).append(imageResult);
        
    }

    function validateAnswer(answer = false){

        var currentAnswer = $(this).text();

        var timeout = (answer === false) ? true : false;

        var currentQuestion = workingQuestionsArray[currentIndex];

        var answerResult = ((answer !== false) ? currentQuestion.validateAnswer(currentAnswer) : answer);

        var imageUrl = currentQuestion.rightAnsImage;
       
        if(!timeout){
            if(answerResult){
                correctAnswers++;
    
                displayResult(imageUrl,answerResult);
    
                clearInterval(countdown);
                
                setTimeout(function(){
                    
                    nextQuestion();
    
                    // clearInterval(answerDisplay);
    
                    if(workingQuestionsArray.length > 0){
                        timer(15);
                    }
                    else{
                        // display score
                        displayScore();
                    }
                    
                    
                },2000);  /* After 5 seconds, then we move on to the next question */
    
            }
            else{
    
                displayResult(imageUrl,answerResult);
    
                clearInterval(countdown);
                
                setTimeout(function(){
                    
                    nextQuestion();
    
                    // clearInterval(answerDisplay);
    
                    if(workingQuestionsArray.length > 0){
                        timer(15);
                    }
                    else{
                        // display score
                        displayScore();
                    }
                    
                    
                },2000);
    
            }
        }
        else{
            displayResult(imageUrl);

            clearInterval(countdown);
            
            setTimeout(function(){
                
                nextQuestion();

                // clearInterval(answerDisplay);

                if(workingQuestionsArray.length > 0){
                    timer(15);
                }
                else{
                    // display score
                    displayScore();
                }
                
                
            },2000);  /* After 5 seconds, then we move on to the next question */
        }
        
        // workingQuestionsArray.splice(currentIndex,1);
    }


    // when you click the answer button then validate the answer
    $(document).on("click", ".answer", validateAnswer);

    
    function displayTimeLeft(seconds){
                
        $(timerCountdown).html(seconds);
    }


    function timer(seconds){


        const now = Date.now();
        
        const then = now + seconds * 1000; // times 1000 milliseconds which is equal to 1 second

        // displayed within the function and within the Set Interval
        displayTimeLeft(seconds);

        var questionArrayLen = workingQuestionsArray.length;


        loadQuestion(workingQuestionsArray[currentIndex]);


        countdown = setInterval(() => {
            

            const secondsLeft = Math.round((then - Date.now())/1000);

            // Check if we should stop the Interval 
            if(secondsLeft < 0) {
                
                unanswered++;

                clearInterval(countdown);
                
                // If there is Question's Left
                if(questionArrayLen > 0){
                               
                    validateAnswer(false);

                    // timer(30);
                }
                
                return;
            }

            displayTimeLeft(secondsLeft);

        }, 1000);

    }

    
    $(document).on("click","#start_game",function(){
        
        // Might was to Display Hidden so I can call the button once the App finishes the questions
        // and want to restart the game
        $("#start_game").remove();

        // Timer is displayed
        $(".lead").addClass("time_container");

        // $("#time_container").css("display","inline !important");

        // In case we restarting the game
        resetScore();


        // We have to clone the array first
        workingQuestionsArray = [...questionsArray];

        workingQuestionsArray = shuffle(workingQuestionsArray);


        // How many questions are there
        questionCount = workingQuestionsArray.length;

        // loadQuestion(questionsArray[currentIndex]);
        timer(15);
           
    });


    $(document).ready(function(){
        
        var startTrivia = $('<button class="btn btn-primary" id="start_game">Start</button>');


        $(loadContent).append(startTrivia);

    });





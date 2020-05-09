

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
        unaswered = 0;
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


        var question = "<div>" + questionObject.question + "</div>";


        var answer1 = '<button id="wrong_answer1" class="answer col-lg-12 col-xl-12">' + questionObject.answer1 + '</button> <br>';
        var answer2 = '<button id="wrong_answer2" class="answer col-lg-12 col-xl-12">'+ questionObject.answer2 + '</button> <br>';
        var answer3 = '<button id="wrong_answer3" class="answer col-lg-12 col-xl-12">'+ questionObject.answer3 + '</button> <br>' ;
        var answer4 = '<button id="right_answer" class="answer col-lg-12 col-xl-12">' + questionObject.rightAnswer + '</button> <br>';

    
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



    function displayScore(){
        
        removeQuestion();

        var startTrivia = $('<button id="start_game">Start</button>');
        var allDone = $("<div>");
        var correctAns = $("<div>");
        var incorrectAns = $("<div>");
        var unAns = $("<div>");
        var wrongAns = (questionCount - unanswered - correctAnswers)
        // wrongAnswer

        $(allDone).text("All Done, here's how you did!")
        $(correctAns).text("Correct Answers: " + correctAnswers);
        $(incorrectAns).text("Incorrect Answers: " + wrongAns);
        $(unAns).text("Unanswered: " + unaswered);

        $(loadContent).append(allDone);
        $(loadContent).append(correctAns);
        $(loadContent).append(incorrectAns);
        $(loadContent).append(unAns);
        $(loadContent).append(startTrivia);

    }


    function displayResult(answer, image){
        
        removeQuestion();

        var result = $("<div>")

        $(result).addClass("m-5 d-flex flex-column justify-content-center");

        if(answer){
            result.text("You are Correct!");
        }
        else{
            result.text("Wrong Answer, Try Again!");
        }

        var img = $("<img>");
        $(img).addClass("m-5 d-flex flex-column justify-content-center");

        img.attr("src", image);

        $(loadContent).append(result);
        $(loadContent).append(img);
        
    }

    function validateAnswer(answer = false){

        var currentAnswer = $(this).text();

        var currentQuestion = workingQuestionsArray[currentIndex];

        var answerResult = ((answer !== false) ? currentQuestion.validateAnswer(currentAnswer) : answer);

        var imageUrl = currentQuestion.rightAnsImage;
       
        if(answerResult){
            correctAnswers++;

            displayResult(answerResult,imageUrl);

            clearInterval(countdown);
            
            setTimeout(function(){
                
                nextQuestion();

                // clearInterval(answerDisplay);

                if(workingQuestionsArray.length > 0){
                    timer(30);
                }
                else{
                    // display score
                    displayScore();
                }
                
                
            },3000);  /* After 5 seconds, then we move on to the next question */

        }
        else{

            displayResult(answerResult,imageUrl);

            clearInterval(countdown);
            
            setTimeout(function(){
                
                nextQuestion();

                // clearInterval(answerDisplay);

                if(workingQuestionsArray.length > 0){
                    timer(30);
                }
                else{
                    // display score
                    displayScore();
                }
                
                
            },3000);

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

        // In case we restarting the game
        resetScore();


        // We have to clone the array first
        workingQuestionsArray = [...questionsArray];

        workingQuestionsArray = shuffle(workingQuestionsArray);


        // How many questions are there
        questionCount = workingQuestionsArray.length;

        // loadQuestion(questionsArray[currentIndex]);
        timer(30);
           
    });


    $(document).ready(function(){
        
        var startTrivia = $('<button class="btn btn-primary" id="start_game">Start</button>');

        $(loadContent).append(startTrivia);

    });





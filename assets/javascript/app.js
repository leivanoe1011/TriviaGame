

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

    var unaswered = 0;

    var questionCount = 0;


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
            
            // Here I need to load a picture of the right answer

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

    function loadQuestion(questionObject){

        var loadContent = $("#load_content");


        var question = "<div>" + questionObject.question + "</div>";


        var answer1 = '<button id="wrong_answer1" class="answer">' + questionObject.answer1 + '</button> <br>';
        var answer2 = '<button id="wrong_answer2" class="answer">'+ questionObject.answer2 + '</button> <br>';
        var answer3 = '<button id="wrong_answer3" class="answer">'+ questionObject.answer3 + '</button> <br>' ;
        var answer4 = '<button id="right_answer" class="answer">' + questionObject.rightAnswer + '</button> <br>';

    
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

 
    let question1 = new QuestionObject("What was the first full length CGI movie?"
        , "A Bug's Life"
        , "Monsters Inc"
        , "The Lion King"
        , "Toy Story"
        ,"assets/images/ToyStory.jpeg");

    let question2 = new QuestionObject('Which popular Disney movie featured the song, "Circle of Life"?'
        , "Aladdin"
        , "Hercules"
        , "Mulan"
        , "The Lion King"
        ,"assets/images/LionKing.jpeg");

    let question3 = new QuestionObject("Which of these is NOT a name of one of the Spice Girls?"
        , "Sporty Spice"
        , "Scary Spice"
        , "Posh Spice"
        , "Fred Spice"
        ,"assets/images/FredSpice.jpg");


    questionsArray.push(question1);
    questionsArray.push(question2);
    questionsArray.push(question3);



    function removeQuestion(){

        $("#load_content").empty();

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

        var allDone = $("<div>");
        var correctAns = $("<div>");
        var incorrectAns = $("<div>");
        var unAns = $("<div>");

        $(allDone).text("All Done, here's how you did!")
        $(correctAns).text("Correct Answers: " + correctAnswers);
        $(incorrectAns).text("Incorrect Answers: " + questionCount - unaswered - correctAnswers);
        $(unAns).text("Unanswered: " + unaswered);

        $(loadContent).append(allDone);
        $(loadContent).append(correctAns);
        $(loadContent).append(incorrectAns);
        $(loadContent).append(unAns);
    }


    function displayResult(answer, image){
        
        removeQuestion();

        var result = $("<div>")

        if(answer){
            result.text("You are Correct!");
        }
        else{
            result.text("Wrong Answer, Try Again!");
        }

        var img = $("<img>");
        img.attr("src", image);

        $(loadContent).append(result);
        $(loadContent).append(img);

        console.log(answer)
        console.log(image);

        
    }

    function validateAnswer(answer = null){
        var currentAnswer = $(this).text();

        var currentQuestion = workingQuestionsArray[currentIndex];

        var answerResult = ((answer === null) ? currentQuestion.validateAnswer(currentAnswer) : answer);

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
                
                
            },5000);  /* After 5 seconds, then we move on to the next question */

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
                }
                
                
            },5000);

        }

        // workingQuestionsArray.splice(currentIndex,1);
    }


    $(document).on("click", ".answer", validateAnswer);

    
    function displayTimeLeft(seconds){
                
        console.log(seconds);

        $(timerCountdown).html(seconds);
    }


    function timer(seconds){

        // clear any existing timers
        // used primary if need to restart the timer
        // clearInterval(countdown);

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
                
                questionArrayLen--;

                unaswered++;

                clearInterval(countdown);
                
                // If there is Question's Left
                if(questionArrayLen > 0){
                    
                    validateAnswer(false);

                    // timer(30);
                }

                // If no questions are left
                validateAnswer(false);
                // Here I can add an Else statement to display the score
                
                return;
            }

            displayTimeLeft(secondsLeft);

        }, 1000);

    }


    $(document).ready(function(){
        
        var startTrivia = $('<button id="start_game">Start</button>');


        $(loadContent).append(startTrivia);


        $("#start_game").click(function(){
            

            $("#start_game").remove();

            console.log("In Start Game Click");

            // We shuffle the questions
            workingQuestionsArray = shuffle(questionsArray);

            questionCount = workingQuestionsArray.length;

            // loadQuestion(questionsArray[currentIndex]);
            timer(30, questionsArray);
               
               
        })


    })





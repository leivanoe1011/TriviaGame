

    var incorrectAnswers = 0;
    var correctAnswers = 0;
    var unanswered = 0;

    // Used to track the countdown of our application
    let countdown;


    // The function will solve the issue of timer when running a timer and not  
    // displaying the second it should begin the timer from
    function displayTimeLeft(seconds){
        console.log("current time " + seconds);
        var timerCountdown = $("#countdown");
        timerCountdown.text(seconds);
    }


    function timer(seconds){

        // clear any existing timers
        // used primary if need to restart the timer
        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000; // times 1000 milliseconds which is equal to 1 second

        // displayed within the function and within the Set Interval
        // displayTimeLeft(seconds);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now())/1000);

            // Check if we should stop the Interval 
            if(secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }

            displayTimeLeft(seconds);
        }, 1000);

    
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
                console.log("You are correct")

                var response = $("<div>");
                
                return response.html("<h3>You are Correct!</h3>" +
                    "<div>" + this.rightAnswer + "</div>" +
                    '<img src="' + this.rightAnsImage + '"/>')
                // return imageUrl;
            }
            else{

                var response = $("<div>");
                
                console.log("Wrong Answer");

                return response.html("<h3>Wrong!</h3>" +
                    "<div>" + this.rightAnswer + "</div>" +
                    '<img src="' + this.rightAnsImage + '"/>')

                // return imageUrl
            }
        };
        
    }

    // Used to load the answers and shuffle them
    var currentAnswers = [];

    // Load Question objects
    var questionsArray = [];


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


    function resetQuestions(){
        questionsArray = shuffle(questionsArray);
    }


    function randomQuestion(){

        return questionsArray[Math.floor(Math.random() * questionsArray.length)];

    }


    /*

        The Question function will store each answer into an array. 
        Each answer will get randomized so the anseris not ordered the same. 

    */


    // Function used to shuffle through Current Answer array and Quetion Object Array
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


    function removeQuestion(){

        $("#load_content").empty();


        
        // Need a for Loop here
        // Iterate through all the DIVs within the Load Content Object
        // Then remove each DIV.
    }

    function loadQuestion(questionObject){

        var loadContent = $("#load_content");

        var timeRemaining = '<div id="countdown"></div>';

        var question = "<div>" + questionObject.question + "</div>";


        var answer1 = '<button id="wrong_answer1" class="answer">' + questionObject.answer1 + '</button> <br>';
        var answer2 = '<button id="wrong_answer2" class="answer">'+ questionObject.answer2 + '</button> <br>';
        var answer3 = '<button id="wrong_answer3" class="answer">'+ questionObject.answer3 + '</button> <br>' ;
        var answer4 = '<button id="right_answer" class="answer">' + questionObject.rightAnswer + '</button> <br>';

    
        $(loadContent).append(timeRemaining);
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

        $( "#wrong_answer1" ).click(function() {
            
            var answer = $(this).text();
            
            var responseImg = questionObject.validateAnswer(answer);

            removeQuestion();

            $(loadContent).append(responseImg);

            alert( "Handler for .click() called." + answer);
        });

        $( "#wrong_answer2" ).click(function() {

            var answer = $(this).text();

            var responseImg = questionObject.validateAnswer(answer);

            removeQuestion();

            $(loadContent).append(responseImg);
            

            alert( "Handler for .click() called." + answer);
        });

        $( "#wrong_answer3" ).click(function() {

            var answer = $(this).text();

            var responseImg = questionObject.validateAnswer(answer);

            removeQuestion();

            $(loadContent).append(responseImg);
            

            alert( "Handler for .click() called." + answer);
        });

        $( "#right_answer" ).click(function() {

            var answer = $(this).text();

            var responseImg = questionObject.validateAnswer(answer);

            removeQuestion();

            $(loadContent).append(responseImg);
            

            alert( "Handler for RIGHT .click() called." + answer );
        });

    }
    // End of Load Question
    

      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".movies").on("click") will only add listeners to elements that are on the page at that time
    // $(document).on("click", ".movie", alertMovieName);


    function timedQuestion(questionObject){

        loadQuestion(questionObject);

        timer(30);
        
        // removeQuestion();

    }


    $(document).ready(function(){
        
        var startTrivia = $('<button id="start_game">Start</button>');


        $("#load_content").append(startTrivia);

        $("#start_game").click(function(){
            

            $("#start_game").remove();
        
            console.log("In Start Game Click");
        
            // We shuffle the questions
            questionsArray = shuffle(questionsArray);
        
            // for(var i = 0; i < questionsArray.length; i++){          
                
            //     timedQuestion(questionsArray[i]);
            // }

            for (var i = 0; i < questionsArray.length; i++)
                (function(i) {
                    setTimeout(function() {
                        
                        timedQuestion(questionsArray[i]);

                        // when someone gueses, we should be able to clear the timeout
                        // Then continue to the next array object

                    }, i * 30000);
                })(i);
        })


    })




    


   




















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


        
        // Need a for Loop here
        // Iterate through all the DIVs within the Load Content Object
        // Then remove each DIV.
    }

    
    function displayTimeLeft(seconds){
                
        console.log(seconds);

        $(timerCountdown).html(seconds);
    }


    function timer(seconds, questionObj){

        // clear any existing timers
        // used primary if need to restart the timer
        clearInterval(countdown);

        const now = Date.now();
        
        const then = now + seconds * 1000; // times 1000 milliseconds which is equal to 1 second

        // displayed within the function and within the Set Interval
        displayTimeLeft("Initial Display " + seconds);

        var questionArrayLen = questionObj.length;

        var currentIndex = 0;

        loadQuestion(questionObj[currentIndex]);

        countdown = setInterval(() => {
            

            const secondsLeft = Math.round((then - Date.now())/1000);

            // Check if we should stop the Interval 
            if(secondsLeft < 0) {
                
                questionArrayLen--;

                clearInterval(countdown);
                
                if(questionArrayLen > 0){
                    questionObj.splice(currentIndex,1);
                    removeQuestion();
                    timer(30, questionObj);
                }
                // Here I can add an Else statement to display the score
                
                return;
            }

            displayTimeLeft("Display within Interval " + secondsLeft);

        }, 1000);

    }


    $(document).ready(function(){
        
        var startTrivia = $('<button id="start_game">Start</button>');


        $(loadContent).append(startTrivia);


        $("#start_game").click(function(){
            

            $("#start_game").remove();

            console.log("In Start Game Click");

            // We shuffle the questions
            questionsArray = shuffle(questionsArray);


            // loadQuestion(questionsArray[currentIndex]);
            timer(30, questionsArray);
               
               
        })


    })





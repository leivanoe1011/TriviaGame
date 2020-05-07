

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

    
    function displayTimeLeft(seconds){
                
        $(timerCountdown).html(seconds);
    }


    function timer(seconds){

        // clear any existing timers
        // used primary if need to restart the timer
        clearInterval(countdown);

        const now = Date.now();
        
        const then = now + seconds * 1000; // times 1000 milliseconds which is equal to 1 second

        // displayed within the function and within the Set Interval
        displayTimeLeft(seconds);

        countdown = setInterval(() => {
            
            const secondsLeft = Math.round((then - Date.now())/1000);

            // Check if we should stop the Interval 
            if(secondsLeft < 0) {
                clearInterval(countdown);
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
            // questionsArray = shuffle(questionsArray);

                timer(30);
        })


    })





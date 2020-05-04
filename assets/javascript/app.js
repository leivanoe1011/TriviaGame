

class questionObject  {
    constructor(question,answer1, answer2, answer3, answer4){
        this.question = question,
        this.answer1 = answer1,
        this.answer2 = answer2,
        this.answer3 = answer3,
        this.rightAnswer = answer4,
        this.questionAsked = false // by default it will set to false, then to true when the question asked
        
        // Here I need to load a picture of the right answer

    }
    
}

var questionsArray = [];


let question1 = new questionObject("what was the first full length CGI movie?"
    , "A Bug's Life"
    , "Monsters Inc"
    , "The Lion King"
    , "Toy Story");

let question2 = new questionObject('Which populate Disney movie featured the song, "Circle of Life"?'
    , "Aladdin"
    , "Hercules"
    , "Mulan"
    , "The Lion King");

let question3 = new questionObject("Which of these is NOT a name of one of the Spice Girls?"
    , "Sporty Spice"
    , "Scary Spice"
    , "Posh Spice"
    , "Fred Spice");


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

// Used to load the answers and shuffle them
var currentAnswers = [];


// Function used to shuffle through Current Answer array and Quetion Object Array
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
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


function loadQuestion (questionObject){

    var question = "<div>" + questionObject.question + "</div>";

    var answer1 = '<div id="wrong_answer1" class="answer">' + questionObject.answer1 + '</div>';
    var answer2 = '<div id="wrong_answer2" class="answer">'+ questionObject.answer2 + '</div>';
    var answer3 = '<div id="wrong_answer3" class="answer">'+ questionObject.answer3 + '</div>';
    var answer4 = '<div id="right_answer" class="answer">' + questionObject.rightAnswer + '</div>';

    var loadContent = $("#load_content");
    
    $(loadContent).append(question);

    currentAnswers.push(answer1);
    currentAnswers.push(answer2);
    currentAnswers.push(answer3);
    currentAnswers.push(answer4);

    currentAnswers = shuffle(currentAnswers);

    for(var i = 0; i < currentAnswers; i++){
        $(loadContent).append(currentAnswers[i]);
    }
   
}

$(".answer").on("click",function(){
    
    var response = $(this);

    var idAnswer = $(response).attr("id");

    if(idAnswer !== "right_answer"){
        console.log("wrong answer")
    }
    else{
        console.log("right answer")
    }
    
})


$(document).ready(function(){
    var startTrivia = $('<button id="start_game">Start</div>');

    ("#load_content").append(startTrivia);
})


$("#start_game").on("click",function(){
    
    questionsArray = shuffle(questionsArray);

    for(var i = 0; i < questionsArray.length; i++){
        loadQuestion(questionsArray[i]);
    }

})














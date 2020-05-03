

class questionObject  {
    constructor(question,answer1, answer2, answer3, answer4){
        this.question = question,
        this.answer1 = answer1,
        this.answer2 = answer2,
        this.answer3 = answer3,
        this.answer4 = answer4
    }
}

var questionsArray = [];


let question1 = new questionObject("what was the first full length CGI movie?", "A Bug's Life", "Monsters Inc", "Toy Story", "The Lion King");
let question2 = new questionObject('Which populate Disney movie featured the song, "Circle of Life"?', "Aladdin", "Hercules", "Mulan", "The Lion King");
let question3 = new questionObject("Which of these is NOT a name of one of the Spice Girls?", "Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice");


questionsArray.push(question1);
questionsArray.push(question2);
questionsArray.push(question3);


function randomQuestion(){

    return questionsArray[Math.floor(Math.random() * questionsArray.length)];

}




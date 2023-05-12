// variables
var benjeben;
var dices;
var reroll_number;
var yahtzee_counter;
var game_number;
var total_score;
var amoungus;


//variabels voor de start van de game
$(document).ready(function($) {
    dices = [];
    resetDicesArray();
    reroll_number = 5;
    yahtzee_counter = 0;
    game_number = 0;
    total_score = 0;
    benjeben = true;
    amoungus = true;

    $("#information").text("Start het ronde zodra je er klaar voor bent.")
// functie to start rerolling the dice
    $("#dice-launch").on("click", "span", function () {
//checken of de player rerolls heeft
        if(reroll_number !== 0) {
          //deze haalt de index van de de dice die was gererolled
            var dice_index = parseInt($(this).attr('id').split("e")[1]);

            var rand_dice = rollADice();
//dices[rand_dice]is an array that keeps track of how many times each number (1-6) has been rolled.
            dices[rand_dice] += 1;

            var alt = parseInt($("#dice" + dice_index).find("img").attr("alt"));
            dices[alt] -= 1;

            $("#dice" + dice_index).empty();

            var image = '<img alt="' + rand_dice + '" style="width: 50px; margin: 5px;" src="images/dobbelsteen' + rand_dice + '.png"/>';
            $("#dice" + dice_index).append(image);

            updateDicesResults();
            updateComboResults();

            reroll_number --;
            if(reroll_number === 0){
                $("#information").text("Je hebt zo vaak mogelijk opnieuw gegooid, klik op \"Beëindig Beurt\" om je beurt te beëindigen.");
            }else{
                $("#information").text("Je kunt sommige dobbelstenen nog steeds opnieuw gooien door erop te klikken.  (" + reroll_number +" resterend)");
            }

        }
    });
//code to start rolling the dice at the begin of the game
    $("#start-stop").click(function(){

        if(game_number < 2) {

            $("#dice-launch").empty();
            for (var i = 1; i <= 5; ++i) {
   
                var rand_dice = rollADice();

              
                dices[rand_dice] += 1;

              
                var image = '<span id="dice' + i +'" ><img  alt="' + rand_dice + '" style="width: 50px; margin: 5px;" src="images/dobbelsteen' + rand_dice + '.png"/></span>';
                $("#dice-launch").append(image);
            }
//checkt welke beurt het is
            game_number ++;
            if(game_number === 1){
                if($("#yahtzee").text() !== "0")
                    yahtzee_counter ++;
                $(this).attr("value", "Beëindig Beurt");
            }else {
                total_score += getScore();
                $(this).attr("value", "Beëindig het ronde");
            }

            $("#information").text("Je kunt nu enkele dobbelstenen opnieuw gooien door erop te klikken. (" + reroll_number +" resterend)");

            $("#score-total").text(total_score.toString());
            updateDicesResults();
            updateComboResults();
        }else if(game_number === 2){
            if($("#yahtzee").text() !== "0")
                yahtzee_counter ++;

            total_score += getScore();

            $("#history").find("table").append("<tr><td>" + "Tijd : " + (new Date()).toLocaleTimeString() + ", score : " + total_score.toString() + "</td></tr>");
//this code is to reset the array
            dices = [];
            resetDicesArray();
            reroll_number = 5;
            total_score = 0;
            yahtzee_counter = 0;
            game_number = 0;

            $("#brelan").text("0");
            $("#carre").text("0");
            $("#full").text("0");
            $("#yahtzee").text("0");
            $("#petite-suite").text("0");
            $("#grande-suite").text("0");
            $("#chance").text("0");
            $("#total").text("0");
            for(var i = 1 ; i < dices.length ; ++ i){
                $("#diceres" + i).text("0");
            }

            $("#dice-launch").empty();
            $(this).attr("value", "Start ronde");
            $("#information").text("Start het spel wanneer je er klaar voor bent.")
        }
    });
});
//roll functie
function rollADice(){
      // This function generates a random number between 1 and 6 and returns it.
    return 1 + Math.floor(Math.random() * 5);
}
//updates the ui
function updateDicesResults(){
    var total = 0;
    for(var i = 1 ; i < dices.length ; ++ i){ //loop door de array of dices
        var score = dices[i] * i; //berekent de score
        total += score

        if(dices[i] !== 0)
        //updates the text content in the html
            $("#diceres" + i).text(score.toString());
        else
            $("#diceres" + i).text("0");
            //if the dices do not appear than the score gets set so 0
    }
    $("#total").text(total);
}
// Scorecard update
function getScore(){
  //code voor wanneer de player een bonus krijgt
    var bonus = parseInt($("#total")) > 63 ? 35 : 0;
    bonus += yahtzee_counter === 2 ? 100 : 0;
   //checkt de scores en returned ze naar de bonus
    if($("#full").text() !== "0") return parseInt($("#full").text()) + bonus;
    if($("#brelan").text() !== "0") return parseInt($("#brelan").text()) + bonus;
    if($("#carre").text() !== "0") return parseInt($("#carre").text()) + bonus;
    if($("#yahtzee").text() !== "0") return parseInt($("#yahtzee").text()) + bonus;
    if($("#petite-suite").text() !== "0") return parseInt($("#petite-suite").text()) + bonus;
    if($("#grande-suite").text() !== "0") return parseInt($("#grande-suite").text()) + bonus;
    if($("#chance").text() !== "0") return parseInt($("#chance").text()) + bonus;
    return -1;
}
// update scorecard
function updateComboResults(){

    var brelan = getBrelanScore();
    var carre = getCarreScore();
    var full = getFullScore();
    var yahtzee = getYahtzeeScore();
    var petite_suite = getStraightScore(4);
    var grande_suite = getStraightScore(5);
//updates de code voor elke combinatie
//it checks for full house
    if(full === 0)
        $("#brelan").text(brelan.toString());
    else
        $("#brelan").text("0");
//dit zorgt ervoor dat de scores in de scorebord komen
    $("#carre").text(carre.toString());
    $("#full").text(full.toString());
    $("#yahtzee").text(yahtzee.toString());
    $("#petite-suite").text(petite_suite.toString());
    $("#grande-suite").text(grande_suite.toString());
//als er geen combinaties zijn word de chance geupdate
    if(brelan === 0 && carre === 0 && full === 0 && yahtzee === 0 && petite_suite === 0 && grande_suite === 0)
        $("#chance").text(getChanceScore());
    else
        $("#chance").text("0");
}//functie om scores te checken

function numberOfSameDices(except, number){
  //checkt hoeveel er van dezelfde dices zijn
    var dice = -1;
    for (var i = 1; i < dices.length; ++i) {
        if (dices[i] === number && i !== except)
            dice = i;
    }
    return dice;
}
//three of a kind
function getBrelanScore(){
    var dice = numberOfSameDices(-1, 3);
    if(dice === -1) return 0;
    return dices[dice] * dice;
}
//four of a kind
function getCarreScore(){
    var dice = numberOfSameDices(-1, 4);
    if(dice === -1) return 0;
    return dices[dice] * dice;
}
//full house
function getFullScore(){
  var dice1 = numberOfSameDices(-1, 3);
  if(dice1 === -1) return 0;

  var dice2 = numberOfSameDices(dice1, 2);
  if(dice2 === -1) dice2 = numberOfSameDices(-1, 2);
  if(dice2 === -1) return 0;

  return 25;
}
//yahtzee
function getYahtzeeScore(){
    var dice = numberOfSameDices(-1, 5);
    if(dice === -1) return 0;
    return 50;
}


function getStraightScore(aimed_straight_length){

    var index = 1;
    var max_straight_length = 0;
    var straight_length = 0;
    
    for(var index = 1 ; index < dices.length ; ++ index){
        if(dices[index] !== 0){
            straight_length ++;
        }else{
            straight_length = 0;
        }

        if(straight_length > max_straight_length){
            max_straight_length = straight_length;
        }
    }
    if(max_straight_length !== aimed_straight_length) return 0;
    return 40;
}
//resets de dices in de array
function resetDicesArray(){
    for(var i = 0 ; i <= 6 ; ++ i)
        dices.push(0);
}
//calculate score of each dice value
function getChanceScore(){
    var score = 0;
    for(var i = 1 ; i < dices.length ; ++ i){
        score += dices[i] * i;
    }
    return score;
}
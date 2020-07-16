/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-16-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-12-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,track } from 'lwc';
import max from '@salesforce/label/c.Bingo_End_Range';
import delay from '@salesforce/label/c.Bingo_Delay_Time';
import cardscount from '@salesforce/label/c.Bingo_Cards_Per_Game';

export default class BingoCard extends LightningElement {
label = {
 	max,
 	delay,
 	cardscount
};
displayedCards = [];
rowSet1 = [0,1,2,3,4];
rowset2 = [5,6,7,8,9];
rowset3 = [10,11,12,13,14];
rowset4 = [15,16,17,18,19];
rowset5 = [20,21,22,23,24];
 timeIntervalInstance;
 @track currentcard=0;
 @track cardsleft = 0;
 label=`${this.currentcard}`;
 footerLabel = `cards left: ${this.cardsleft}`;
 
handleClick(event){

}

fillData(){
	this.template.querySelector("c-card").fillData();
	
}

startGame(){
	var count = cardscount;
	var parentThis = this;
	var milliSecondsToWait = delay;
	//this.displayedCards = [];
	parentThis.cardsleft = count;//this.label.cardscount;
	parentThis.currentcard = this.getRandomInt(max);
	let buttons=this.template.querySelectorAll(".button");
	for(var i=0;i<buttons.length;i++){
		buttons[i].disabled="true";
	}
	this.timeIntervalInstance = setInterval(function(){
		var displayedCard = parentThis.getRandomInt(max);
		if(!(parentThis.displayedCards.includes(displayedCard))){
			parentThis.currentcard = displayedCard;
			parentThis.displayedCards.push(displayedCard);
			parentThis.cardsleft--;
			parentThis.footerLabel = `cards left: ${parentThis.cardsleft}`
			count--;
			parentThis.label=`${parentThis.currentcard}`;
			milliSecondsToWait=delay;
		}else{
			milliSecondsToWait=1;
		}
		if(count===0){
			console.log('Displayed Cards;'+parentThis.displayedCards);
			clearInterval(parentThis.timeIntervalInstance);
		}
		console.log('milliSecondsToWait'+milliSecondsToWait);
	},milliSecondsToWait);
}


getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

}

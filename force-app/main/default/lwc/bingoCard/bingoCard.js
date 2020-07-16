/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-15-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-12-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,track } from 'lwc';

const MAX=100;

export default class BingoCard extends LightningElement {
displayedCards = [];
rowSet1 = [0,1,2,3,4];
rowset2 = [5,6,7,8,9];
rowset3 = [10,11,12,13,14];
rowset4 = [15,16,17,18,19];
rowset5 = [20,21,22,23,24];
 timeIntervalInstance;
 milliSecondsToWait = 5000;
 @track currentcard=0;
 @track cardsleft = 0;
 label=`${this.currentcard}`;
 footerLabel = `cards left: ${this.cardsleft}`
handleClick(event){

}

fillData(){
	this.template.querySelector("c-card").fillData();
	
}

startGame(){
	console.log("inside start game");
	var count = 35;
	var parentThis = this;
	parentThis.cardsleft = count;
	parentThis.currentcard = this.getRandomInt(MAX);
	this.timeIntervalInstance = setInterval(function(){
		var displayedCard = parentThis.getRandomInt(MAX);
		if(!(parentThis.displayedCards.includes(displayedCard))){
			parentThis.currentcard = displayedCard;
			parentThis.displayedCards.push(displayedCard);
			parentThis.cardsleft--;
			parentThis.footerLabel = `cards left: ${parentThis.cardsleft}`
			console.log('cardsleft'+parentThis.cardsleft);
			count--;
			parentThis.label=`${parentThis.currentcard}`;
			parentThis.milliSecondsToWait=5000;
		}else{
			parentThis.milliSecondsToWait=1;
		}
		if(count===0){
			console.log('Displayed Cards;'+parentThis.displayedCards);
			clearInterval(parentThis.timeIntervalInstance);
		}
	},parentThis.milliSecondsToWait);
}


getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

}

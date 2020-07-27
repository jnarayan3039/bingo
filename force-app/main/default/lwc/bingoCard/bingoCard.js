/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-27-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-12-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,track } from 'lwc';
import max from '@salesforce/label/c.Bingo_End_Range';
import delay from '@salesforce/label/c.Bingo_Delay_Time';
import delayMisMatch from '@salesforce/label/c.Bingo_Delay_Time_Mismatch';
import cardscount from '@salesforce/label/c.Bingo_Cards_Per_Game';

export default class BingoCard extends LightningElement {

 displayedCards = [];
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
	this.displayedCards=[];
	var count = cardscount;
	var parentThis = this;
	var milliSecondsToWait = delay;
	parentThis.cardsleft = count;//this.label.cardscount;
	parentThis.currentcard = this.getRandomInt(max,parentThis.displayedCards);
	let buttons=this.template.querySelectorAll(".button");
	for(var i=0;i<buttons.length;i++){
		buttons[i].disabled=true;
	}
	this.timeIntervalInstance = setInterval(function(){
		var displayedCard = parentThis.getRandomInt(max, parentThis.displayedCards);
		parentThis.currentcard = displayedCard;
		parentThis.displayedCards.push(displayedCard);
		parentThis.cardsleft--;
		parentThis.footerLabel = `cards left: ${parentThis.cardsleft}`
		count--;
		parentThis.label=`${parentThis.currentcard}`;
		if(count===0){
			clearInterval(parentThis.timeIntervalInstance);
			for(var j=0;j<buttons.length;j++){
				buttons[j].disabled=false;
			}
		}
	},milliSecondsToWait);
	
}


getRandomInt(max, displayedCards) {
	let randomNumber = Math.floor(Math.random() * Math.floor(max));
	if(!displayedCards.includes(randomNumber)){
		return randomNumber;
	}else{
		return this.getRandomInt(max,displayedCards);
	}
}

}
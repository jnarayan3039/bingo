/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-16-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-15-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,api,track } from 'lwc';
const MAX=100;
export default class Card extends LightningElement {
@api currentcard;
usedNums = [];
rows = [1,2,3,4,5];
value=this.getRandomInt(MAX);

@api fillData(){
    this.usedNums=[];
    let matchedValues = this.template.querySelectorAll(".square");
    console.log('Matched Values:'+matchedValues.length);
    for(var i=0;i<matchedValues.length;i++){
        console.log(matchedValues[i].label);
       
        var newNum = this.getRandomInt(MAX);
        if(this.usedNums.includes(newNum)){
            i--;
            continue;
        }else{
            matchedValues[i].label = newNum;
            matchedValues[i].iconName='';
            this.usedNums.push(newNum);
        }
    }
    
}

handleClick(event){
    console.log(event.target.label);
    if(this.currentcard == event.target.label){
        event.target.iconName = 'action:approval';
    }else{
    }
}

getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

}
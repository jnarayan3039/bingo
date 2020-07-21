/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-21-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-15-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import max from '@salesforce/label/c.Bingo_End_Range';
export default class Card extends LightningElement {
@api currentcard;
usedNums = [];
rows = [1,2,3,4,5];
value=this.getRandomInt(max);
selectedValues = [];
@api fillData(){
    this.usedNums=[];
    let matchedValues = this.template.querySelectorAll(".square");
    let matrixRow = Math.sqrt(matchedValues.length);
    for(var i=0;i<matrixRow;i++){
        var jIndex =(i*matrixRow);
        for(var j=0;j<matrixRow;j++){
            var newNum = this.getRandomInt(max);
            if(this.usedNums.includes(newNum)){
                j--;
                continue;
            }else{
                matchedValues[j+jIndex].label = newNum;
                matchedValues[j+jIndex].iconName='';
                matchedValues[j+jIndex].index = i+''+j;
                console.log("index:"+matchedValues[j+jIndex].index);
                this.usedNums.push(newNum);
            }
        }
    }
}

handleClick(event){
    console.log(event.target.label);
    if(this.currentcard === event.target.label){
        event.target.iconName = 'action:approval';
        var index = event.target.index;
        console.log('Index:'+index);
        this.selectedValues.push(index);
        this.checkBingo(index);
    }else{
    }
}

checkBingo(currentCell){
    let rowNumber = currentCell[0];
    let columnNumber = currentCell[1];
    console.log('Selected Values:'+this.selectedValues);
   this.checkRowBingo(rowNumber, this.selectedValues).length===5 ? this.handleRowMessage(rowNumber):'';
   this.checkColumnBingo(columnNumber, this.selectedValues).length===5 ? this.handleColMessage(columnNumber):'';
}

checkRowBingo(rowNum, matchedValues){
    return matchedValues.filter(row => row.startsWith(rowNum+''));
}

checkColumnBingo(columnNumber, matchedValues){
    return matchedValues.filter(col => col.endsWith(columnNumber+''));
}

handleRowMessage(index){
    let rowNumber = eval(index) + 1;
    const event = new ShowToastEvent({
        title: 'Bingo Row Housie',
        message: 'Row '+ eval(rowNumber.valueOf()) +' Housie',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
    
}
handleColMessage(index){
    let colNumber = eval(index) + 1;
     const event = new ShowToastEvent({
        title: 'Bingo Column Housie',
        message: 'Column '+ eval(colNumber.valueOf()) +' Housie',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
    
}

getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

}
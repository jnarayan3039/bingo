/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 07-27-2020
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   07-27-2020   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement,track } from 'lwc';

export default class Test extends LightningElement {
    @track value;

    handleClick(){
        let a = +prompt("Enter a number?"+"");
        let b = +prompt("Enter another number?"+"");
        var sum=a + b;
        this.value=`Sum of Two Numbers is: ${sum}`;
    }
}
import { LightningElement, track, wire } from 'lwc';
import getCars from '@salesforce/apex/ProductCar.getCars';
import Color__c from '@salesforce/schema/Product2.Color__c';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class DataTable extends LightningElement {
    @track data;
   // @track keyword;
    @track columns = [
        {label: 'Model', fieldName: 'Family', type: 'picklist'},
        {label: 'Brand', fieldName: 'Brand__c', type: 'picklist'},
        {label: 'Image', fieldName: 'Product_Image_Link__c', type: 'image'},
        {label: 'Color', fieldName: 'Color__c', type: 'picklist', editable: true},
        {label: 'Price', fieldName: 'UnitPrice', type: 'currency'}
    ];
   

    @wire(getCars)
    productRecord({error, data}){
        if(data){
            this.data = data.map(row=>{
                return{... row, Family: row.Product2.Family,
                                Brand__c: row.Product2.Brand__c,
                                Product_Image_Link__c: row.Product2.Product_Image_Link__c,
                                Color__c: row.Product2.Color__c,
                                }});
        }
    }


    handleKeyWordChange(event) {
        this.keyword = event.target.value;
        console.log("Search Keyword: " + this.keyword);

    }

    handleSave(event) {

        const fields = {}; 
        fields[Color__c.fieldApiName] = event.detail.draftValues[0].Color__c;

        const recordInput = {fields};

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Product updated',
                    variant: 'success'
                })
            );
            // Display fresh data in the datatable
            return refreshApex(this.data).then(() => {

                // Clear all draft values in the datatable
                this.draftValues = [];

            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}
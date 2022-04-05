import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Product2.Family';
import OWNER_NAME_FIELD from '@salesforce/schema/Product2.Name';
import PHONE_FIELD from '@salesforce/schema/Product2.ProductCode';


export default class readRecord extends LightningElement {
    @wire(getRecord, { recordId: '01t8c00000K6DdtAAF', fields: [NAME_FIELD], optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD] })
    account;

     get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }
    
    get owner() {
        return getFieldValue(this.account.data, OWNER_NAME_FIELD);
    }
}
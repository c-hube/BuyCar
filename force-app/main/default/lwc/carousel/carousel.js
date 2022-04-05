import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import TYPE_FIELD from '@salesforce/schema/Product2.Family';
import NAME_FIELD from '@salesforce/schema/Product2.Name'

export default class Carousel extends LightningElement {
    @wire(getRecord, { recordId: '01t8c00000K6DdtAAF', fields: [TYPE_FIELD, NAME_FIELD]})
    product;

     get type() {
        return getFieldValue(this.product.data, TYPE_FIELD);
    }
    get name() {
        return getFieldValue(this.product.data, NAME_FIELD);
    }

    @wire(getRecord, { recordId: '01t8c00000K6DdoAAF', fields: [TYPE_FIELD, NAME_FIELD]})
    product2;

    get type2() {
        return getFieldValue(this.product2.data, TYPE_FIELD);
    }
    get name2() {
        return getFieldValue(this.product2.data, NAME_FIELD);
    }

}
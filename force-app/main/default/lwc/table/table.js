import { LightningElement, wire } from 'lwc';
import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_DATA_BASIC,
} from './sampleData';

import readRecord from '../readProduct/readProduct';

export default class TreeGridBasic extends LightningElement {
    @wire(getRecord, { recordId: '01t8c00000K6DdtAAF', fields: [NAME_FIELD], optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD] })
    account;
    // definition of columns for the tree grid
    //gridColumns = EXAMPLES_COLUMNS_DEFINITION_BASIC;
    gridColumns = 

    // data provided to the tree grid
    gridData = EXAMPLES_DATA_BASIC;


}


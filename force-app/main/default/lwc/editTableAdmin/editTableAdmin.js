import { LightningElement, wire, api, track } from 'lwc';
import getCars from '@salesforce/apex/ProductCar.getCars';
import { refreshApex } from '@salesforce/apex';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Family from '@salesforce/schema/Product2.Family';
import Code_FIELD from '@salesforce/schema/Product2.ProductCode';
import ID_FIELD from '@salesforce/schema/Product2.Id';
import Brand from '@salesforce/schema/Product2.Brand__c';
import Color from '@salesforce/schema/Product2.Color__c';
import Product2 from '@salesforce/schema/Product2';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';

export default class BasicDatatable extends LightningElement {
    @track value;
    @track error;

    @api sortedDirection = 'asc';
    @api sortedBy = 'Family';
    @api searchKey = '';
    @api searchBrand = '';
    @api searchColor = '';
    draftValues = [];
    @track page = 1; 
    @track items = []; 
    @track toggle = false;

    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0;
    @track totalPage = 0;
    result;
    data;
    _wiredResult;

    //columns = columns;
    draftValues = [];

    @track columns = [
        { label: 'Model', fieldName: 'Family', type: 'picklist', editable: this.toggle },
        { label: 'Brand', fieldName: 'Brand__c', type: 'picklist', editable: this.toggle },
        { label: 'Image', fieldName: 'Product_Image_Link__c', type: 'image' },
        { label: 'Color', fieldName: 'Color__c', type: 'picklist', editable: this.toggle },
        { label: 'Price', fieldName: 'Price__c', type: 'currency',  },
        
    ];
    // eslint-disable-next-line @lwc/lwc/no-async-await
    @wire(getCars, {searchKey: '$searchKey', searchBrand: '$searchBrand', searchColor: '$searchColor', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})
    wiredAccounts(wireResult) {
        const { data, error } = wireResult;
        this._wiredResult = wireResult;
        if (data) {
        
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
        //clicking on previous button this method will be called
        previousHandler() {
            if (this.page > 1) {
                this.page = this.page - 1; //decrease page by 1
                this.displayRecordPerPage(this.page);
            }
        }
    
        //clicking on next button this method will be called
        nextHandler() {
            if((this.page<this.totalPage) && this.page !== this.totalPage){
                this.page = this.page + 1; //increase page by 1
                this.displayRecordPerPage(this.page);            
            }             
        }
    
        //this method displays records page by page
        displayRecordPerPage(page){
    
            this.startingRecord = ((page -1) * this.pageSize) ;
            this.endingRecord = (this.pageSize * page);
    
            this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                                ? this.totalRecountCount : this.endingRecord; 
    
            this.data = this.items.slice(this.startingRecord, this.endingRecord);
    
            this.startingRecord = this.startingRecord + 1;
        }    
        
        sortColumns( event ) {
            this.sortedBy = event.detail.fieldName;
            this.sortedDirection = event.detail.sortDirection;
            return refreshApex(this.result);
            
        }

        value ='';

    // to get the default record type id, if you dont' have any recordtypes then it will get master

    @wire(getObjectInfo, { objectApiName: Product2})

    accountMetadata;

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: Family 
        }
    )
    industryPicklist;
    handleChange(event) {
        this.searchKey = event.detail.value;
    }

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: Brand
        }
    )
    brandPicklist;

    handleChangeBrand(event) {
        this.searchBrand = event.detail.value;
    }

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: Color
        }
    )
    colorPicklist;

    handleChangeColor(event) {
        this.searchColor = event.detail.value;
    }

    handleSave(event) {

        const fields = {}; 
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[Brand.fieldApiName] = event.detail.draftValues[0].Brand__c;
        fields[Color.fieldApiName] = event.detail.draftValues[0].Color__c;
        fields[Family.fieldApiName] = event.detail.draftValues[0].Family;
        fields[Code_FIELD.fieldApiName] = event.detail.draftValues[0].ProductCode;

        const recordInput = {fields};

        updateRecord(recordInput).then(() => {
            return refreshApex(this._wiredResult).then(()=> {
                this.draftValues = [];
                console.log('test');
        });
        })
    }

    handleToggle(event) {
       // this.toggle = !this.toggle;
       this.toggle = event.detail.checked;
       this.columns = [
        { label: 'Model', fieldName: 'Family', type: 'picklist', editable: this.toggle },
        { label: 'Brand', fieldName: 'Brand__c', type: 'picklist', editable: this.toggle },
        { label: 'Image', fieldName: 'Product_Image_Link__c', type: 'image' },
        { label: 'Color', fieldName: 'Color__c', type: 'picklist', editable: this.toggle },
        { label: 'Price', fieldName: 'Price__c', type: 'currency',  },
    ];
    }

}

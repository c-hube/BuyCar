import { LightningElement, wire, api, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpps from '@salesforce/apex/FilterDataTable.getOpps';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Family from '@salesforce/schema/Product2.Family'
import Product2 from '@salesforce/schema/Product2';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const columns = [{
        label: '# Pay',

    },
    {
        label: 'Unpaid Auto Balance',

    },
    {
        label: 'Monthly Auto Capital Payment',

    },
    {
        label: 'Monthly Payment of Auto Interest',

    },
    
    {
        label: 'Total payment with VAT',

    }

];

export default class LightningDatatableExample extends LightningElement {
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Family';
    @api searchKey = '';
    result;
    
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0;
    @track totalPage = 0;
  
    @wire(getOpps, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})
    wiredAccounts({ error, data }) {
        if (data) {
        
            this.items = data;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            
            this.data = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.columns = columns;

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
    

    /*handleKeyChange( event ) {
        //this.searchKey = event.target.value;
        return refreshApex(this.result);
    }*/

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

}
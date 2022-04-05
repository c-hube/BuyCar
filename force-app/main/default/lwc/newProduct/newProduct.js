import { LightningElement, wire, api } from 'lwc';
import FAMILY from '@salesforce/schema/Product2.Family';
import BRAND from '@salesforce/schema/Product2.Brand__c';
import NAME from '@salesforce/schema/Product2.Name'
import COLOR from '@salesforce/schema/Product2.Color__c';
import PRODUCT2 from '@salesforce/schema/Product2';
import PRICE from '@salesforce/schema/Product2.Price__c';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile'

export default class NewProduct extends LightningElement {
    
    product2 = PRODUCT2;
    nameField = NAME;
    familyField = FAMILY;
    brandField = BRAND;
    colorField = COLOR;
    priceField = PRICE;
    productId; 
    fileData
    recordId;
    toggle = false;
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg'];
    }

    /*handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
    }*/

    handleSuccess(event) {
        this.productId = event.detail.id;       
    }

    /////////////////////////

    openfileUpload(event) {
        this.recordId = this.productId;
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }
    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            
        })
    }



    

}


import { LightningElement, track, api } from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf';
import jsPdfAutoTable from '@salesforce/resourceUrl/jsPdfAutoTable';


const columns = [
    {label: '# Pay', fieldName: 'pay'},
    {label:'Unpaid Auto Balance', fieldName: 'unpaid'},
    {label:'Monthly Auto Capital Payment', fieldName: 'monthly'},
    {label:'Monthly Payment of Auto Interest', fieldName: 'interest'},
    {label: 'Total payment with Vat', fieldName: 'total'},
];

export default class Simulator extends LightningElement {
    
    columns = columns;
    @api recordId;
    amount = 0;

    term = 0;
    @track paymentPlan = [];
    amount = 0;
    dowPayment = 0;

    get options() {
        return [
            { label: '12 Months', value: '12' },
            { label: '24 Months', value: '24' },
            { label: '36 Months', value: '36' },
            { label: '48 Months', value: '48' },
            { label: '60 Months', value: '60' },
            { label: '72 Months', value: '72' },
            
        ];
    }

    ///////////////////PDF/////////////////
    headers = [
        'pay',
        'unpaid',
        'monthly',
        'interest',
        'total'
    ];

    renderedCallback() {
        Promise.all([loadScript(this, JSPDF), loadScript(this, jsPdfAutoTable)])
          .then(() => {
            console.log("loaded");
            this.jsPDFLoaded = true;
          })
          .catch(() => {
            console.log("not loaded");
          });

    }

    createHeaders(keys) {
		let result = [];
		for (let i = 0; i < keys.length; i += 1) {
			result.push({
				id: keys[i],
				name: keys[i],
				prompt: keys[i],
				width: 65,
				align: "center",
				padding: 0
			});
		}
		return result;
	}

    ///////////////////////////////////

    calculatePlan() {
        let paymentPlan = [];
        let y= 0;
        for(let i = 0; i<this.term*1; i++) {
            let month = {
                pay: i*1+1,
                unpaid: (this.amount = this.amount -((this.amount - this.dowPayment)/this.term)).toFixed(2),
                monthly: ((this.amount - this.dowPayment)/this.term).toFixed(2),
                interest: (y = (this.amount * .10)).toFixed(2),
                total: (y + this.amount).toFixed(2)
            };
            paymentPlan.push(month);
        }
        y = this.amount ;
        this.paymentPlan = paymentPlan;
        console.log(this.paymentPlan);
        return this.paymentPlan;
    }
    generateData(){
        this.generatePdf();
    }
    generatePdf(){

		const { jsPDF } = window.jspdf;
		const doc = new jsPDF();
        doc.text("Payments Table", 20, 20);
        if (this.paymentPlan != null) {

            var rows = [];
  
            var filteredRecords = this.paymentPlan.map(function (el) {
              var temp = [
                el.pay,
                el.unpaid,
                el.monthly,
                el.interest,
                el.total,
  
              ];
  
              rows.push(temp);
  
            });
            console.log(rows);
        doc.autoTable({
            head: [[
                'pay',
                'unpaid',
                'monthly',
                'interest',
                'total'
            ]],
            body: rows
        });
		//doc.table(30, 30, this.paymentPlan, this.headers, { autosize:true });
        let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
		doc.save(day + "/" + month + "/" + year + ".pdf");
	}

    }
    

    handleChangeTerm(event) {

        this.term = event.detail.value;
        
    }

    handleChangeAmount(event) {
        this.amount = event.detail.value;
       
    }
    handleChangeDow(event) {
        this.dowPayment = event.detail.value;
    }

    /////////////////////excel///////////////////
    
    exportContactData(){
        let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.headers.forEach(element => {            
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        // Add the data rows
        this.paymentPlan.forEach(record => {
            doc += '<tr>';
            doc += '<th>'+record.pay+'</th>'; 
            doc += '<th>'+record.unpaid+'</th>'; 
            doc += '<th>'+record.monthly+'</th>'; 
            doc += '<th>'+record.interest+'</th>';
            doc += '<th>'+record.total+'</th>'; 
            doc += '</tr>';
        });
        doc += '</table>';
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = day + '/' + month + '/' + year + '.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }
    

}



import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";


export default class NavToHome extends NavigationMixin(LightningElement) {

    navigateToHome(){
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name: 'Home'
            }
        }
        );
    }

    navigateToAddCar(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'newCar__c'
            }
        }
        );
    }
    navigateToCars(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'existingCars__c'
            }
        }
        );
    }
    navigateToLogout(){
        const config = {
            type: 'standard__webPage',
            attributes: {
                url: 'https://buycars-developer-edition.na213.force.com/test'
            }
        };
        this[NavigationMixin.Navigate](config);
    }
}
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

    navigateToCars(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'cars__c'
            }
        }
        );
    }

    navigateToAppointment(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'appointments__c'
            }
        }
        );
    }
    navigateToSimulator(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'simulator__c'
            }
        }
        );
    }
    navigateToLogin(){
        const config = {
            type: 'standard__webPage',
            attributes: {
                url: 'https://buycars-developer-edition.na213.force.com/admin'
            }
        };
        this[NavigationMixin.Navigate](config);
    }
}
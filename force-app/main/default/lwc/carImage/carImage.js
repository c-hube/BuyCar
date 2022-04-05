import { LightningElement, api } from 'lwc';

export default class CarImage extends LightningElement {
    @api url;
    @api altText;
}
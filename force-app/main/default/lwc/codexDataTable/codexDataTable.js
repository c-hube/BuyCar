import LightningDataTable from 'lightning/datatable';
import carImageControl from './carImageControl.html';

export default class CodexDataTable extends LightningDataTable {
    static customTypes = {
        image: {
            template: carImageControl
        }
    };
}
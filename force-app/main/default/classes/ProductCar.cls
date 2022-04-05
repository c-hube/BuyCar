public with sharing class ProductCar {
    public ProductCar() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Product2> getCars(String searchKey, String searchBrand, String searchColor, String sortBy, String sortDirection){

        String query = 'SELECT Id, Family, Brand__c, Product_Image_Link__c, Color__c, Price__c, isActive, ProductCode FROM Product2';
        system.debug('query---'+query);
        if ( (searchKey != null && searchKey != '') || (searchBrand != null && searchBrand != '') || (searchColor != null && searchColor != '' )) {
            String key = '%' + searchKey + '%';
            String key2 = '%' + searchBrand + '%';
            String key3 = '%' + searchColor + '%';
            query += ' WHERE Brand__c LIKE :key2 AND Family LIKE :key AND Color__c LIKE :key3';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        else {
            query += 'ORDER BY Family';
        }
        return Database.query( query );




               /* return [SELECT Product2.Family, Product2.Brand__c, Product2.Product_Image_Link__c, Product2.Color__c, PricebookEntry.UnitPrice 
        FROM PricebookEntry WHERE Product2.Brand__c != '' LIMIT 
         100];
         
        Product2 product = [SELECT Family, Brand__c, Product_Image__c, Color__c
        FROM Product2 WHERE Brand__c != '' LIMIT 
         100];

         return price + product;

         return [SELECT Id, Family, Brand__c, Product_Image__c, Color__c, (SELECT UnitPrice FROM PricebookEntry__r)
         FROM Product2 LIMIT 
          100];*/

    }

}

public with sharing class FilterDataTable {
    @AuraEnabled(cacheable=true)
   public static List<Product2> getOpps( String searchKey, String sortBy, String sortDirection) {
      
       String query = 'SELECT Family, Name,Brand__c,Product_Image_Link__c,Color__c FROM Product2';
       system.debug('query---'+query);
       if ( searchKey != null && searchKey != '' ) {
           String key = '%' + searchKey + '%';
           query += ' WHERE Family LIKE :key';
       }

       if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
       }
       else {
           query += 'ORDER BY Family';
       }
       return Database.query( query );
   }


}
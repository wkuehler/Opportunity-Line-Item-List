public with sharing class oppLineItemDisplayApexController {
  @AuraEnabled(cacheable=true)
  public static List<OpportunityLineItem> getLineItems(String opportunityId) {
    system.debug('Opportunity id:  ' + opportunityId);
    return [
      SELECT
        Id,
        OpportunityId,
        Quantity,
        TotalPrice,
        UnitPrice,
        ListPrice,
        Description,
        Name,
        ProductCode,
        Product2Id,
        Product2.Name,
        PricebookEntryId
      FROM OpportunityLineItem
      WHERE OpportunityId = :opportunityId
    ];
  }
}

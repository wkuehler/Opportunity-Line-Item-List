import { LightningElement, api, wire } from "lwc";
import getLineItems from "@salesforce/apex/oppLineItemDisplayApexController.getLineItems";
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const COLS = [
   { label: "Id", fieldName: "Id", editable: false },
   { label: "Name", fieldName: "Name", type: "text", editable: false },
   {
      label: "Quantity",
      fieldName: "Quantity",
      type: "integer",
      editable: true
   }
];

export default class OppLineItemDisplay extends LightningElement {
   @api recordId;
   columns = COLS;
   draftValues = [];
   addingnew = false;

   runDebugger() {
      debugger;
   }

   addNew(event) {
      this.addingnew = true;
   }

   handleaddnewolisuccess() {
      this.addingnew = false;
      return refreshApex(this.opplineitems);
   }

   handleaddnewolicancel() {
      this.addingnew = false;
      return refreshApex(this.opplineitems);
   }

   @wire(getLineItems, { opportunityId: "$recordId" })
   opplineitems;

   handleSave(event) {
      debugger;

      const recordInputs = event.detail.draftValues.slice().map((draft) => {
         const fields = Object.assign({}, draft);
         return { fields };
      });

      const promises = recordInputs.map((recordInput) => updateRecord(recordInput));
      Promise.all(promises)
         .then((oli) => {
            this.dispatchEvent(
               new ShowToastEvent({
                  title: "Success",
                  message: "Opportunity Line Items updated",
                  variant: "success"
               })
            );
            // Clear all draft values
            this.draftValues = [];

            // Display fresh data in the datatable
            return refreshApex(this.opplineitems);
         })
         .catch((error) => {
            // Handle error
         });
   }
}

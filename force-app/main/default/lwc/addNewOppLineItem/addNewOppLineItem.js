import { LightningElement, api } from "lwc";

export default class AddNewOppLineItem extends LightningElement {
   @api oppid;
   oli_id;

   handleSuccess(event) {
      this.oli_id = event.detail.id;

      const addnewolisuccess = new CustomEvent("addnewolisuccess", {});
      this.dispatchEvent(addnewolisuccess);
   }

   handleCancel(event) {
      const addnewolicancel = new CustomEvent("addnewolicancel", {});
      this.dispatchEvent(addnewolicancel);
   }
}

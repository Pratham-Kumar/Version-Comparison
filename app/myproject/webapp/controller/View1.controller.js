sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.sap.myproject.controller.View1", {
        onInit: function () {

        },
        onSubmit: function () {
            debugger
            let oModel = this.getOwnerComponent().getModel();

            const odemandID = this.getView().byId("productID").getValue();
            const oactivityDescEN = this.getView().byId("productName").getValue();
            const ocontractOwner = this.getView().byId("quantity").getValue();
            const ouserFocalPointName = this.getView().byId("createdBy").getValue();
            const oversion = this.getView().byId("version").getValue();


            let data = {
                "DemandID": odemandID,
                "ActivityDescriptionEN": oactivityDescEN,
                "ContractOwnerName": ocontractOwner,
                "UserFocalPointName": ouserFocalPointName,
                "Version": oversion
            };

            oModel.create("/Products", data, {
                success: function (res) {
                    MessageBox.success("Submit successfully");
                    console.log("done", res);
                },
                error: function (err) {
                    MessageBox.error("ERROR");
                    console.error("Error in Submit:", err);
                }
            });
        },
        onCancel: function () {
            this.getView().byId("productID").setValue("");
            this.getView().byId("productName").setValue("");
            this.getView().byId("quantity").setValue("");
            this.getView().byId("createdBy").setValue("");
        },
        onCompare:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView2")
        }
        // onCompare: function() {
        //     var oRouter = this.getOwnerComponent().getRouter("RouteView2");
        //     var oModel = this.getView().getModel(); // Replace "yourModelName" with the name of your model
            
        //     var oFormData = oModel.getProperty("/Products"); // Assuming "Products" is the path to your data
        
        //     var odemandID = this.getView().byId("productID").getValue();
            
        //     if (oFormData && odemandID) {
        //         var oProductData = oFormData.filter(function(item) {
        //             return item.DemandID === odemandID;
        //         });
        
        //         if (oProductData && oProductData.length > 0) {
        //             oRouter.navTo("RouteView2", {
        //                 DemandID: odemandID,
        //                 ProductData: oProductData
        //             });
        //         } else {
        //             MessageBox.error("No product data found for the provided DemandID");
        //         }
        //     } else {
        //         MessageBox.error("Product data or DemandID is missing");
        //     }
        // }
        
    });
});

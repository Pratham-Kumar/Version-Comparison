sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("com.sap.myproject.controller.View2", {
        onInit: function () {
            // var oRouter = this.getOwnerComponent().getRouter();
            // oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);
            
        },
        onBeforeRendering:function(){
            this.onRead()
        },

        // _onRouteMatched: function (oEvent) {
        //     debugger
        //     var oArgs = oEvent.getParameter("arguments");
        //     var oView = this.getView();
        //     var oProducts = oArgs.ProductData;

        //     // Check if oProducts is an array and has at least two entries
        //     if (Array.isArray(oProducts) && oProducts.length >= 2) {
        //         // Get the last two entries of the array
        //         var lastTwoEntries = oProducts.slice(-2);
                
        //         // Set the last two entries to the model "ProductData"
        //         oView.setModel(new JSONModel(lastTwoEntries), "ProductData");
        //     } else {
        //         // Show error message if there are not enough entries
        //         MessageBox.error("Not enough data available to display.");
        //     }
        // }
        onRead: function () {
            var oModel = this.getOwnerComponent().getModel();
            var jModel = new JSONModel();
            var that = this; // Store the reference to the controller context
        
            oModel.read("/Products", {
                success: function (res) {
                    var data = res.results;
        
                    // Sort the data based on the Version attribute
                    data.sort(function(a, b) {
                        return parseInt(a.Version) - parseInt(b.Version);
                    });
        
                    // Get the last two entries
                    var lastTwoEntries = data.slice(-2);
        
                    // Get the last entry
                    var lastEntry = lastTwoEntries[lastTwoEntries.length - 1];
                    var secondLastEntry = lastTwoEntries[0];
        
                    // Create an object to store the filtered data
                    var filteredEntry = {};
        
                    // Loop through the fields in the last entry
                    for (var key in lastEntry) {
                        // Check if the field exists in the second last entry and has a different value
                        if (lastEntry.hasOwnProperty(key) && secondLastEntry.hasOwnProperty(key) && lastEntry[key] !== secondLastEntry[key]) {
                            // Keep the value if it differs
                            filteredEntry[key] = lastEntry[key];
                        } else {
                            // Set to blank if it's the same as the previous entry
                            filteredEntry[key] = "";
                        }
                    }
        
                    // Add the filtered entry to the model
                    jModel.setData([filteredEntry]);
                    that.getView().setModel(jModel, "ProductData"); // Use the stored reference to the controller context
                },
                error: function () {
                    MessageBox.error("Failed to fetch data from the server.");
                }
            });
        }
        
    });
});

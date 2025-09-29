import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import View from "sap/ui/core/mvc/View";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.logaligroup.invoices.controller
 */
export default class Main extends Controller{

    public onInit() : void {
        this.loadModel();
    }

    private loadModel () : void {
        const data = {
            recipient: {
                name: 'World'
            }
        };
        const model = new JSONModel( data );
        this.getView()?.setModel( model, 'view' );
    }

    public onShowMessage() : void {
        
        // Forma 1
        //const resourceModel = ( this.getView() as View ).getModel("i18n") as ResourceModel;
        
        // Forma 2 (Recomendado para i18n)
        const resourceModel = ( this.getOwnerComponent() as UIComponent ).getModel('i18n') as ResourceModel;

        // Igual para ambas formas
        const sMessage = ( resourceModel.getResourceBundle() as ResourceBundle ).getText('helloWorld') as string;
        
        MessageToast.show(sMessage);

    }

}
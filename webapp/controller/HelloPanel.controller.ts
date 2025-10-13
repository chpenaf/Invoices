import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UIComponent from "sap/ui/core/UIComponent";
import Dialog from "sap/m/Dialog";
import View from "sap/ui/core/mvc/View";
import Fragment from "sap/ui/core/Fragment";


/**
 * @namespace com.logaligroup.invoices.controller
 */
export default class HelloPanel extends Controller {

    private dialog : Dialog;

    public onInit() : void {

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

    public async onOpenDialog() : Promise<void> {

        let view = this.getView() as View;

        if ( !this.dialog ) {
            this.dialog = await Fragment.load({
                id: view.getId(),
                name: "com.logaligroup.invoices.fragment.HelloDialog",
                controller: this
            }) as Dialog;
        }

        view.addDependent( this.dialog );
        this.dialog.open();

    }

    public onCloseDialog() : void {
        this.dialog.close();
    }

}
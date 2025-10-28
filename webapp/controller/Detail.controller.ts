import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import View from "sap/ui/core/mvc/View";
import History from "sap/ui/core/routing/History";

/**
 * @namespace com.logaligroup.invoices.controller
 */

export default class Detail extends Controller {


    public onInit () : void | undefined {
        const router = ( this.getOwnerComponent() as Component ).getRouter();
        router.getRoute("RouteDetails")?.attachPatternMatched(this.onBindingContextRoute, this);
        
    }

    public onBindingContextRoute( event : Route$PatternMatchedEvent ) : void {
        let args = event.getParameter("arguments") as any;
        const path = window.decodeURIComponent(args.path);
        const view = this.getView() as View;

        view.bindElement({
            path: path,
            model: "northwind"
        })
    }

    public onNavToBack () : void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if ( previousHash !== undefined ) {
            window.history.go(-1);
        } else {
            const router = ( <Component>this.getOwnerComponent() ).getRouter();
            router.navTo("RouteMain");
        }

    }

}
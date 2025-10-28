import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import List from "sap/m/List";
import ListBinding from "sap/ui/model/ListBinding";
import { MultiComboBox$SelectionFinishEvent,
         MultiComboBox$SelectionChangeEvent } from "sap/m/MultiComboBox";
import Item from "sap/ui/core/Item";
import Component from "../Component";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import Context from "sap/ui/model/odata/v2/Context";

/**
 * @namespace com.logaligroup.invoices.controller
 */

export default class InvoicesList extends Controller {

    public onInit() : void {
        this.currencyModel();
        this.statusModel();
    }

    private currencyModel() : void {

        let data = {
            usd: "USD"
        };
        const model = new JSONModel(data);
        this.getView()?.setModel( model, "currency" );

    }

    private statusModel() : void {
        let data = {
            status: [
                { stat: 'A', text: 'New' },
                { stat: 'B', text: 'In progress' },
                { stat: 'C', text: 'Done' }
            ]
        };
        const model = new JSONModel(data);
        this.getView()?.setModel( model, "statusModel" );
        console.log(data); 
    }

    public onSearchPress( event : SearchField$SearchEvent ) : void {

        const sQuery = event.getParameter("query");

        let aFilters = [];

        if (sQuery) {
            aFilters.push(
                new Filter({
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, sQuery),
                        new Filter("ShipperName", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                })
            );
        }

        this.applyFilter( aFilters );

    }

    public handleSelectionChange( event : MultiComboBox$SelectionChangeEvent ) : void { 
        const items = event.getParameter("changedItems");        
        let aFilters = this.buildMultiComboBoxFilter( items );        
        this.applyFilter( aFilters );
    }

    public handleSelectionFinish( event : MultiComboBox$SelectionFinishEvent ) : void {
        const items = event.getParameter("selectedItems");        
        let aFilters = this.buildMultiComboBoxFilter( items );        
        this.applyFilter( aFilters );
    }

    private buildMultiComboBoxFilter( items: Item[] | undefined ) : Filter[] | undefined {

        if ( !items ) return;

        const filters : Filter[] = [];

        items.forEach( (item) => {
            const filter = new Filter("Status", FilterOperator.EQ, item.getKey() );
            filters.push( filter );
        });

        if ( !filters ) return;

        let aFilters = [];
        aFilters.push(
            new Filter({
                filters,
                and: false
            })
        );

        return aFilters;
    }

    private applyFilter( aFilters : Filter[] | undefined  ) : void {
        if ( !aFilters ) return;
        const list = this.byId("List") as List;
        const binding = list.getBinding("items") as ListBinding;
        binding.filter(aFilters);
    }

    public onNavToDetail( event : Event ) : void {
        const item = event.getSource() as ObjectListItem;
        const bindingContext = item.getBindingContext("northwind") as Context;
        const path = bindingContext.getPath();

        // console.log(bindingContext.getObject());                // Obtiene el objeto completo
        // console.log(bindingContext.getPath());                  // Obtiene la url de un objeto especifico
        // console.log(bindingContext.getProperty("ProductName")); // Obtiene el valor de un campo especifico
        
        const router = ( this.getOwnerComponent() as Component ).getRouter();
        router.navTo("RouteDetails", {
            path: window.encodeURIComponent(path)
        });
    }

}
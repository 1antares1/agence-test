namespace agence.common.models {
    export interface JQueryDataTable extends JQuery {
        DataTable(): any;
    }

    export interface IDatatableSetup {
        inputSearchPlaceholder: string;
        inputSearchClass: string;
        isProcessing: boolean;
        isServerSide: boolean;
        searchDelay?: boolean;
        delayTime?: number;
        customEmpty?: string;
        removeLoadingLayer?: boolean;
    }

    export interface IPopoverSetup {
        HTMLElement: ng.IAugmentedJQuery,
        classContainer: string;
        popoverTitle: string;
        popoverName?: string;
        targetName?: string;
        removeLoadingLayer?: boolean;
    }

    export interface IAugmentedJQueryExtend extends ng.IAugmentedJQuery {
        tooltip(params: any): void;
        popover(params: any): void;
    }
}

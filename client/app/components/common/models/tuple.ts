namespace agence.common.models {
    export interface ITuple {
        value: any
        text: any;
    }

    export class Tuple implements ITuple {
        constructor(
            public value: any,
            public text: any
        ) { }
    }
}
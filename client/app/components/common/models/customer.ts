namespace agence.common.models {
    
    export interface ICustomer {
        personGuid: string;
        friendlyUsername: string;
        title: string;
        firstName: string;
        lastName: string;
        middleName: string;
        suffix: string;
        dob: Date;
        gender: number;
        emailAddress: string;
        emailIsVerified: boolean;
    }

    export class Customer implements ICustomer {
        constructor(
            public personGuid: string,
            public friendlyUsername: string,
            public title: string,
            public firstName: string,
            public lastName: string,
            public middleName: string,
            public suffix: string,
            public dob: Date,
            public gender: number,
            public emailAddress: string,
            public emailIsVerified: boolean,
        ) { }
    }
}
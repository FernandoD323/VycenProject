export class CompanyModel {
    constructor(
        public id: string,
        public name: String,
        public address: String,
        public phone: String,
        public email: String,
        public description: String
    ) { }
}
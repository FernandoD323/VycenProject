
export class ProductModel {
    constructor(
        public id: string,
        public name: String,
        public size: String,
        public sex: String,
        public price: Number,
        public stock: Number,
        public date: Date,
        public company: String
    ) { }
}
export class UserModel {
    constructor(
        public id: string,
        public name: String,
        public lastName: String,
        public username: String,
        public country: String,
        public phone: String,
        public email: String,
        public password: String,
        public role: String,
        public about: String
    ) { }
}
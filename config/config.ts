export class Config {
    private static dbAccess = {
        dbName: 'wheninrome-db',
        dbUser: 'root',
        dbPass: 'I3BFzQmvLuOv8z4j'
    }
    static mongoConn = `mongodb+srv://${this.dbAccess.dbUser}:${this.dbAccess.dbPass}@cluster0.qp3hs.mongodb.net/${this.dbAccess.dbName}?retryWrites=true&w=majority`
    static origin = 'http://localhost:4200'
    static swaggerRoute = 'api-docs';
}

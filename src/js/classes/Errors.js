export class ErrorShowDefault extends Error {
    constructor(msg, cause, typeError) {
        super(msg);
        this.cause = cause + " de tipo " + typeError;
        this.name = typeError;
    }
}

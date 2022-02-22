module.exports = class IncorrectResponseDTO {
    message;
    code;
    params;


    constructor(model) {
        this.message = model.message;
        this.code = model.code;
        this.params = model.params;
    }
}
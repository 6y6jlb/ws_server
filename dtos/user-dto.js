module.exports = class UserDTO {
    email;
    id;
    name;
    language;
    location;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.email = model.name | model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.location = model.location;
        this.language = model.language;
    }
}
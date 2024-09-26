const { v4: uuidv4 } = require('uuid');

class GenerateSessionId {
    static generate() {
        return uuidv4();
    }
}

module.exports = GenerateSessionId;
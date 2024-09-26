class GenerateToken {
    static generateToken = () => {
        const token = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        return { token, expiresAt };
    }
}
module.exports = GenerateToken
export const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} -- Request ${req.method}: ${req.url}`);
    next(); // 🔥 VERY IMPORTANT
}
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
        const user = await User.findOne({ username });

        if (!user) return done(null, false, { message: "User not found" });

        const isMatched = await bcrypt.compare(password, user.password);

        if (isMatched) {
            return done(null, user);
        }else{
            return done(null, false, { message: "Incorrect password" })
        }
    } catch (error) {
        return done(error)
    }
  }
));

// Whatever you pass here gets stored in the session (usually user.id)
passport.serializeUser((user, done) => {
    console.log("We are inside serializeUser");
    done(null, user._id)
});

passport.deserializeUser(async (_id, done) => {
    try {
        console.log("We are inside deseralizeUser");
        const user = await User.findById(_id);
        done(null, user)
    } catch (error) {
        done(error)
    }
})

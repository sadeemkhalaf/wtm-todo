import User from '../database/models/user.model.js';
import PassportJWT from 'passport-jwt'
import PassportLocal from 'passport-local';

const JwtStrategy = PassportJWT.Strategy;
const Extractjwt = PassportJWT.ExtractJwt;
const LocalStrategy = PassportLocal.Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, cb) => {

        return UserModel.findOne({ email, password })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
);

const jwtFunction = (passport) => {
    let opts = {};
    opts.jwtFromRequest = Extractjwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
  };

export default jwtFunction;


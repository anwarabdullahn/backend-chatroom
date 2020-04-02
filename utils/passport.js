import User from '../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { SECRET } = process.env;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

export default function (passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) =>
      User.findOne({ email: jwt_payload.email }).then(
        (user) => (user ? done(null, user) : done(null, false)),
      )
    ),
  );
};

import db from '../../db/models';
import passportJWT from 'passport-jwt';
import { PassportStatic } from 'passport';
const { Client } = db;

// passport & jwt config
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;

// define passport jwt strategy
const jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
const secretOrKey = process.env.JWT_SECRET_OR_KEY;
const opts = { jwtFromRequest, secretOrKey };
const passportJWTStrategy = new JWTStrategy(opts, async (jwtPayload, done) => {
  try {
    // retrieve mail from jwt payload
    const name = jwtPayload.name;

    // if mail exist in database then authentication succeed
    const client = await Client.findOne({ where: { name } });
    if (client) {
      done(null, client);
    } else {
      done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

// config passport
export default (passport: PassportStatic) => {
  // token strategy
  passport.use(passportJWTStrategy);

  // return configured passport
  return passport;
};

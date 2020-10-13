import db from '../../db/models';
import passportJWT from 'passport-jwt';
import { PassportStatic } from 'passport';
import type { ClientCreationAttributes } from '../../db/models/client';
import { Optional } from 'sequelize/types';
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
    const clientResp = await Client.findOne({ where: { name } });
    if (clientResp) {
      const client: Optional<ClientCreationAttributes, 'password'> = clientResp.get();
      delete client.password;
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

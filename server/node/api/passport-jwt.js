const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'YOUR_SECRET_KEY', // NOTE - secret key is application wide, not for each user
};

const strategy = new JwtStrategy(options, (payload, done) => {
  // Verify user based on payload data
  User.findOne({ _id: payload.userId }, (err, user) => {
    if (err || !user) {
      return done(err, false);
    }

    done(null, user);
  });
});

passport.use(strategy);

exports.generateToken = (user) => {
    const payload = {
      userId: user.userId,
      username: user.username,
    //   email: user.email,
    };
  
    //expiresIn potential options 30m, 12hr, 2s,7d. Should not do extremely long(indefinite token) for security reasons, as token could be compromised over time, instead better to use refresh token
    const token = jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    return token;
  };



  //-------------------------------------------
  // Refresh token Method
  //-------------------------------------------

//   const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'YOUR_SECRET_KEY',
// };

// const refreshStrategy = new JwtStrategy(options, (payload, done) => {
//   // Verify refresh token
//   const refreshToken = payload.refreshToken;
//   const user = await User.findOne({ refreshToken });

//   if (!user || !refreshToken) {
//     return done(err, false);
//   }

//   // Generate new access token
//   const newAccessToken = generateAccessToken(user);

//   done(null, { newAccessToken });
// });

// passport.use(refreshStrategy);
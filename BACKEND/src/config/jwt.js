//Define el secret y el expiresIn para el token

module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: "1h"
};

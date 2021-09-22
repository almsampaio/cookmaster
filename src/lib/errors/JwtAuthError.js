module.exports = (jwtError) => {
  switch (jwtError) {
    case 'jwt must be provided':
      return 'missing auth token';
  
    default:
      return 'jwt malformed';
  }
};

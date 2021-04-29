'use strict';

module.exports = function(err, req, res, next){
  const error = err.message ? err.message : err;

  const errorObject = {
    status: 500, 
    message: error
  }
  res.status(500).json(errorObject);
}

// module.exports = (err, req, res, next) => {
//   let error = { error: err.message || err };
//   res.statusCode = err.status || 500;
//   res.statusMessage = err.statusMessage || 'Server Error';
//   res.setHeader('Content-Type', 'application/json');
//   res.write(JSON.stringify(error));
//   res.end();
// };
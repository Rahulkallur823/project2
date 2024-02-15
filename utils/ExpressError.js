// class ExpressError extends Error{
//     constructor(statuscode,error){
//         super();
//     this.statuscode=statuscode;
//     this.message=error.message;
//     }
// }
// module.exports = ExpressError;

// ExpressError.js
class ExpressError extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statuscode;
      this.message = message;
    }
  }
  
  module.exports = ExpressError;
  
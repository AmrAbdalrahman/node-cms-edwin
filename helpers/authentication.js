module.exports = {

  userAuthenticated: function (req, res, next) {


      if(req.isAuthenticated()){
     /* if(true){*/

         return next();
      }

      res.redirect('/login');
  }


};
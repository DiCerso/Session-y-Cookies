var express = require('express');
var router = express.Router();
let validator = require('../validations/validator')
const {validationResult} = require('express-validator');
let cookieCheck = require('../validations/cookie')


/* GET home page. */
router.get('/',cookieCheck, function(req, res, next) {
    if(req.session.userLogin){
      res.render('vista', { 
        title: 'Express',
        dato : req.session.userLogin
      });
    }else{
      res.render('index', { title: 'Express' });
    }
});

router.get('/vista2',cookieCheck, function(req, res) {
  res.render('vista2', {dato : req.session.userLogin})
})

router.get('/Deslogueo',cookieCheck, function(req, res) {
  req.session.destroy()
  res.cookie('cookie', null, { maxAge: -1 })
  res.redirect('/')
})

router.get('/Color', cookieCheck, function(req, res){
  req.session.userLogin.color = null
  res.render('vista', { 
    title: 'Express',
    dato : req.session.userLogin
  });
})

router.post('/', validator ,function(req, res, next) {
  const errores = validationResult(req);
    if(errores.isEmpty()){
      req.session.userLogin = {
        nombre : req.body.nombre,
        color : req.body.colors,
        edad : req.body.edad,
        email : req.body.email
      }
      if (req.body.remember) {
        res.cookie('cookie', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      }
      res.render('vista', { 
        title: 'Express',
        dato : req.session.userLogin
      });
    }else{
      res.render('index', {errores: errores.array(), old : req.body, title: 'Express'})
    }
    
})

module.exports = router;

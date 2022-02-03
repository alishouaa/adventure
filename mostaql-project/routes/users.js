const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User } = require('../Database-admin/User')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

router.post('/register', [
  body('username')
    .trim().isLength({ min: 5, max: 44 }).isString()
    .withMessage('Please enter a valid username.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email.'),
  body('password')
    .trim().not().isEmpty().isLength({ min: 5, max: 1024 })
    .withMessage("Please don't send a empty data."),
    body('phone')
    .trim().not().isEmpty().isLength({ min: 5, max: 100 })
    .withMessage("Please don't send a empty phone."),


], async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const err = new Error('الحساب مسجل مسبقاً');
      next(err);
      return;
    }
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err
        })
      }
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        isAdmin : req.body.isAdmin,
        phone : req.body.phone
      })
      user.save()
        .then(user => {
          let token = jwt.sign({ username: user.username }, 'verySecretValue', { expiresIn: '1h' })
          res.json({
            message: 'created user successfully',
            token: token, _id: user._id, isAdmin : user.isAdmin
          })
        })
        .catch(error => {
          res.json({
            message: 'error occuted'
          })
        })
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
})



router.post('/login', async (req, res, next) => {

  var email = req.body.email
  var password = req.body.password

  User.findOne({ $or: [{ email: email }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.send({
              error: err
            })
          }
          if (result) {
            let token = jwt.sign({ email: user.email }, 'verySecretValue', { expiresIn: '1h' })
            res.send({
              message: 'تم تسجيل الدخول بنجاح',
              token: token, _id: user._id, isAdmin:user.isAdmin
            })
          } else {
            const err = new Error('كلمة السر خاطئة');
            next(err);

          }
        })
      } else {
        const err = new Error('الحساب غير موجود');
        next(err);
      }
    })

})


router.get('/get-user', async (req, res, next) => {
  const user = await User.find()
  if (!user) {
    const error = new Error('لا يوجد بيانات');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).send({ user });
})

router.get('/get-one-user/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
      const err = new Error('not found user');
      next(err);
      return;
  }
  res.status(200).json({ user })
})

module.exports = router;

const { signup, login, submit } = require('../Controllers/AuthController');
const { signupValidation, loginValidation , authenticatedSubmitValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/submit', authenticatedSubmitValidation, submit )

module.exports = router;
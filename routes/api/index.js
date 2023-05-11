const router = require('express').Router();
const throughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoute');

router.use('/thought', throughtRoute);
router.use('/user', userRoute);

module.exports = router;
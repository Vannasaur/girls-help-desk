const router = require('express').Router();

const {
    loginUser,
    logoutUser
} = require('../../controllers/userControllers');

// The routes will match '/api/user' to handle POST, and DELETE requests.

//  POST will call the loginUser controller.
//  DELETE will call the logoutUser controller.
router.route('/')
    .post(loginUser)
    .delete(logoutUser);

module.exports = router;

// In the future, we may implement PUT calls to allow users to change their passwords; not part of MVP scope.
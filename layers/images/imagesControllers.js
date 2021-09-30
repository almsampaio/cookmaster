// const { Router } = require('express');

// const loginMiddleware = require('./loginMiddleware');
// const authMiddleware = require('../authentication/authMiddleware');

// const router = Router();

// router.post('/id:',
// loginMiddleware.emptyFildValidation,
// loginMiddleware.loginValidation,
// authMiddleware.tokenGenerator,
// async () => {});
/* REQUISIÇÃO:
# user lucas
http POST :3000/login/ email='lucas@gmail.com' password='Senha123'
token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzI2LCJleHAiOjE2MzMwOTU1MjZ9.lh5SZGE159Yc79EBp5H7K-8fABh1MRHorGlQPdLKBi4"

# user erick
http POST :3000/login/ email='erickjacquin@gmail.com' password='12345678'
token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"

# user admin
http POST :3000/login/ email='root@email.com' password='admin'
token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyOTIyODEyLCJleHAiOjE2MzMwOTU2MTJ9.FbqGgDfjk58hXseaiNTE5Q3HJiM2z02SUHJwJPNn3dU"
*/

// module.exports = router;

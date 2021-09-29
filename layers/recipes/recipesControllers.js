const { Router } = require('express');

const authMiddleware = require('../authentication/authMiddleware');
const recipesMiddlewares = require('./recipesMiddlewares');

const router = Router();

router.post('/',
authMiddleware.tokenValidation,
recipesMiddlewares.emptyFildValidation,
recipesMiddlewares.createRecipes,
async () => {});
/* REQUISIÇÃO:
// Criar uma receita com o usuário lucas
http POST :3000/recipes/ name='miojo do lucas' ingredients='macarrão' preparation='cozer' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzI2LCJleHAiOjE2MzMwOTU1MjZ9.lh5SZGE159Yc79EBp5H7K-8fABh1MRHorGlQPdLKBi4"

// Criar uma receita com o usuário erick
http POST :3000/recipes/ name='miojo do erick' ingredients='macarrão' preparation='cozer' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"
*/

router.get('/',
recipesMiddlewares.getAllRecipes,
async () => {});
/* REQUISIÇÃO:
// Consultar todas as receitas sem autenticação do usuário Erick
http GET :3000/recipes/

// Consultar todas as receitas com autenticação do usuário Erick
http GET :3000/recipes/ authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"
*/

router.get('/:id',
recipesMiddlewares.getRecipeById,
async () => {});
/* REQUISIÇÃO:
// Consultar a receita por id sem autenticação
http GET :3000/recipes/614f93e9731b88de6cfb03e7
*/

router.put('/:id',
authMiddleware.tokenValidation,
recipesMiddlewares.emptyFildValidation,
recipesMiddlewares.updateRecipe,
async () => {});
/* REQUISIÇÃO:
// Editar uma receita com autenticação do usuário Lucas
http PUT :3000/recipes/61538414085f8bc5067a9f4b name='ovo' ingredients='ovo' preparation='cozer' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzI2LCJleHAiOjE2MzMwOTU1MjZ9.lh5SZGE159Yc79EBp5H7K-8fABh1MRHorGlQPdLKBi4"

// Editar uma receita com autenticação do usuário Erick
http PUT :3000/recipes/61538414085f8bc5067a9f4b name='ovo' ingredients='ovo' preparation='cozer' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"

// Editar uma receita com autenticação do usuário admin
http PUT :3000/recipes/61538414085f8bc5067a9f4b name='ovo' ingredients='ovo' preparation='ovo' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyOTIyODEyLCJleHAiOjE2MzMwOTU2MTJ9.FbqGgDfjk58hXseaiNTE5Q3HJiM2z02SUHJwJPNn3dU"
*/

router.delete('/:id',
authMiddleware.tokenValidation,
recipesMiddlewares.removeRecipe,
async () => {});
/* REQUISIÇÃO:
// Deletar uma receita com autenticação do usuário Lucas
http DELETE :3000/recipes/6153948d15b175e56ec1951f authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzI2LCJleHAiOjE2MzMwOTU1MjZ9.lh5SZGE159Yc79EBp5H7K-8fABh1MRHorGlQPdLKBi4"

// Deletar uma receita com autenticação do usuário Erick
http DELETE :3000/recipes/6153948d15b175e56ec1951f authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"

// Deletar uma receita com autenticação do usuário admin
http DELETE :3000/recipes/6152976dce52fec6b4146d90 authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyOTIyODEyLCJleHAiOjE2MzMwOTU2MTJ9.FbqGgDfjk58hXseaiNTE5Q3HJiM2z02SUHJwJPNn3dU"
*/

module.exports = router;

/* USUÁRIOS DE TEST:
# user lucas
authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzI2LCJleHAiOjE2MzMwOTU1MjZ9.lh5SZGE159Yc79EBp5H7K-8fABh1MRHorGlQPdLKBi4"

# user erick
authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyOTIyNzUwLCJleHAiOjE2MzMwOTU1NTB9.-aeIAX4uXPbPSbzmW7pSDCZD44FoND7qlTKzWMxmOso"

# user admin
authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyOTIyODEyLCJleHAiOjE2MzMwOTU2MTJ9.FbqGgDfjk58hXseaiNTE5Q3HJiM2z02SUHJwJPNn3dU"
*/
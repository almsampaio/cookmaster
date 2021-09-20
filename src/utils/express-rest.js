const express = require('express');
const { last, initial } = require('lodash-fp');

const Router = () => {
  const routes = express.Router();
  routes.rest = (route, ...controllers) => {
    const controller = last(controllers);
    const middleware = initial(controllers);

    routes.post(`${route}`, [...middleware, controller.create]);
    routes.get(`${route}`, [...middleware, controller.getAll]);
    routes.get(`${route}/:id`, [...middleware, controller.get]);
    routes.put(`${route}/:id`, [...middleware, controller.update]);
    routes.delete(`${route}/:id`, [...middleware, controller.delete]);
  };
  return routes;
};

module.exports = { ...express, Router };
const express = require('express');
const { last, initial } = require('lodash');

const Router = () => {
  const routes = express.Router();
  routes.rest = (route, ...controllers) => {
    const controller = last(controllers);
    const middleware = initial(controllers);

    routes.post(`${route}`, [...middleware, controller.create]);
    routes.get(`${route}`, [...middleware, controller.readMany]);
    routes.get(`${route}/:id`, [...middleware, controller.readOne]);
    routes.put(`${route}/:id`, [...middleware, controller.update]);
    routes.delete(`${route}/:id`, [...middleware, controller.delete]);
  };
  return routes;
};

module.exports = { ...express, Router };
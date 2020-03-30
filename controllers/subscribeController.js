const Subscribe = require('../models/subscribeModel');
const factory = require('./handlerFactory');

exports.getAllSubscriber = factory.getAll(Subscribe);
exports.getSubscriber = factory.getOne(Subscribe);
exports.createSubscriber = factory.createOne(Subscribe);
exports.updateSubscriber = factory.updateOne(Subscribe);
exports.deleteSubscriber = factory.deleteOne(Subscribe);

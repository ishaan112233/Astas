const mongoose=require('mongoose');
const express = require('express');
const path = require('path');
//const MONGOLAB_URI = 'mongodb://astas:astas123@ds121753.mlab.com:21753/astas';
//var dbURI= process.env.MONGOLAB_URI;
if(process.env.NODE_ENV=='production'){
    dbURI=process.env.MONGODB_URI;
}
mongoose.connect('mongodb://astas:astas123@ds121753.mlab.com:21753/astas');

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${'mongodb://astas:astas123@ds121753.mlab.com:21753/astas'}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
require('./sections');
require('./uploadedFaculty');
require('./SendTimetable');
require('./FacultyAdd');


'use strict'
import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', (err) => {
            console.log('Mongo DB | could not connect to the database');
            mongoose.disconnect();
        })
        mongoose.connection.on('connecting', () => {
            console.log('Mongo DB | Try connecting to the database');
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongo DB | Database connected');
        })
        mongoose.connection.on('open', () => {
            console.log('Mongo DB | connected to database');
        })
        mongoose.connection.on('reconnected', () => {
            console.log('Mongo DB | reconnected to MongoDB');
        })
        mongoose.connection.on('disconnected', () => {
            console.log('Mongo DB | disconnected');
        })
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (err) {
        console.log(err);
        throw new Error('Error connecting to the database');
    }
}
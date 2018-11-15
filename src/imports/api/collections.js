import { Mongo } from 'meteor/mongo'

export const Notes = new Mongo.Collection('notes')
export const Items = new Mongo.Collection('items')

export const Things = new Meteor.Collection('things')
export const Metrics = new Meteor.Collection('metrics')
export const EdgeData = new Meteor.Collection('edgedata')
export const CommandResults = new Meteor.Collection('requestcommandresult')

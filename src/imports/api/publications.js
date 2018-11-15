import { Meteor } from 'meteor/meteor'
import { Notes, Items, Things, Metrics, EdgeData, CommandResults } from './collections'

Meteor.publish('notes', function (limit) {
  return Notes.find({}, {
    sort: { created: -1 },
    limit,
  })
})

Meteor.publish('items', function () {
  return Items.find({})
})

Meteor.publish('things', function () {
  return Things.find({})
})

Meteor.publish('metrics', function() {
  return Metrics.find({})
})

Meteor.publish('edgedata', function() {
  return EdgeData.find({})
})

Meteor.publish('requestcommandresult', function() {
  return CommandResults.find({})
})

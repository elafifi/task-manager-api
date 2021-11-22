// CRUD create read update delete

/*const monogdb = require('mongodb');
const MongoClient  = monogdb.MongoClient;
const ObjectID = monogdb.ObjectId;
*/
const { ObjectID } = require('bson');
const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId()
console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology:true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to task-manager DB');
    }

    //console.log('Connected to task-manager DB successfully!');

    const db = client.db(databaseName);
    
    
    /*db.collection('users').insertOne({
        name: 'Ahmed Elafifi',
        age: 27
    }, (error, result) => {
        if( error ) {
            return console.log("Unable to insert user")
        }

        console.log(result.ops)
    });*/

    /*db.collection('users').insertMany([
        {
            name: "jen",
            age: 28
        }, {
            name: "mody",
            age: 18
        }
    ], (error, result) => {
        if(error) {
            return console.log("Unable to insert users");
        }

        console.log(result.ops)
    })*/

    /*db.collection('tasks').insertMany([
        {
            description: "description 1",
            completed: true
        }, {
            description: "description 2",
            completed: false
        }, {
            description: "description 3",
            completed: false
        }
    ], (error, result) => {
        if ( error ) {
            return console.log('Unable to insert tasks')
        }

        console.log(result.ops)
    })*/

    /*db.collection('users').findOne({name: 'jen'}, (error, user) => {
        if ( error ) {
            return console.log('Unable to find required user');
        } 
    })

    db.collection('users').find( {age: 18} ).toArray((error, result) => {
        console.log(result);
    })

    db.collection('users').find( {age: 18} ).count((error, count) => {
        console.log(count);
    })*/

    /*db.collection('tasks').findOne({ _id: new ObjectId("617ff40400955e2b884d22a9") }, (error, task) => {
        if(error) {
            console.log("Unable to fetch task");
        }

        console.log(task);
    })

    db.collection('tasks').find( {completed: false} ).toArray((error, tasks) => {
        if (error) {
            console.log("Unable to fetch tasks")
        }

        console.log(tasks);
    })*/

    /* db.collection('users').updateOne( {
        _id: new ObjectId("617fdfde593e0a04083c91e2")
    }, {
        $set: {
            name: "samir"
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    } ) */

    /*db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })*/

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})


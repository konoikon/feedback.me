let mongo = require('mongodb');
let assert = require('assert');
let MongoClient = mongo.MongoClient;


// Creates a comment in the database
let createComment = (db, callback) => {
    
    let collection = db.collection('comments');
    
    let doc = {_id: create_UUID(), text: "Lorem ipsum dolor sit amet", author: 'John Doe',
                timestamp: new Date().getTime()};
    
    collection.insert(doc, (err, result) => {
        
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("A document was inserted into the collection");
        
        callback(result);
    });
}

let getComments = (db, callback) => {
    
    let cursor = db.collection('comments').find({});
   
    cursor.each((err, doc) => {
        
        assert.equal(err, null);
        
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
    
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
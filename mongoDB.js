/*  
    73.
    use natours-test
    db.tours.insertOne({name: 'The forest Hiker', price:'297', rating: '4.7'})

    db.tours.find()

    show dbs

    use natours-test
    show collections
    ->tours

    quit()

    74. 
    db.tours.insertMany([{name: 'The forest Hiker', price:'297', rating: '4.7'},{}])

    75.
    db.tours.find( {name: "The Forest Hiker"} )

    db.tours.find( {difficulty: "easy"} )


    //Query Operator $ is mongoDB Operator 
    //price < 500
    //less and equal than 500
    
    db.tours.find( {price: {$lte: 500} })

    //less than 500 $lt and gte
    db.tours.find({ price: {$lt:500}, rating: {$gte: 4.8} })

    //$or
    db.touts.find( $or: [ { price: {$lt: 500} }, { rating: {$gte: 4.8} } ] )

    db.touts.find( $or: [ { price: {$gt: 500} }, { rating: {$gte: 4.8} } ] )

    db.touts.find( $or: [ { price: {$gt: 500} }, { rating: {$gte: 4.8} }, { name: 1 } ] )



    // 75. CRUD Updating Documents

    db.tours.updateOne({ name :"Ther Snow Adventure" }, {$set:  {price: 597} })
    db.tours.find()

    db.tours.find( { price: {$gt: 500}, rating: {$gte :4.8} } )
    
    db.tours.updateMany( { price: {$gt: 500}, rating: {$gte :4.8} } , {$set: {premium: true}})
    Note : Check multiple documents but updated only filters matching.


    // 76 Deleting Documents one and many
    db.tours.find()

    db.tours.deleteMany({ rating: {$lt: 4.8 } })

    // 78. Compass app for CRUD Operations
    Before this tutorial download MongoDB Compass from mongodb.com
    













*/



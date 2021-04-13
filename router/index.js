const
    express = require('express'),
    bodyParser = require('body-parser'),
    router = express().use(bodyParser.json());

router.use('/conversation',require('./conversation'));
router.use('/message',require('./message'));

function start(port) {

    if(!port){
        console.log(`Listening Port is not Specified`);
        throw new Error();
    }

    console.log(`Application is trying to Listen on ${port}`);
    
    // Sets server port and logs message on success
    router.listen(port, (error) => {

        if(error){
            throw new Error();
        }

        console.log(`Application is Listening on ${port} ...`);

    });

}

module.exports = {start};
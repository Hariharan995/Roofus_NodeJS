
const express = require('express');
const router = express.Router();

const propertyService = require('../service/propertyService');
const houseService = require('../service/houseService')

router.get('/getProperty/:id', async(req, res)=> {
    try {
      let property = await propertyService.getPropertyById(req.params['id']);
      if(property) {
        res.status(200).json({property});
      } else {
        res.status(200).json({message: "No data found"});
      }
    } catch(err) {
        res.status(500).json({message: "Something went Wrong!"});
    }
  });


router.get('/getproperties', async(req, res)=> {
try {
    let property = await propertyService.getproperties();
    if(property) {
    res.status(200).json({list: property});
    } else {
    res.status(200).json({message: "No data found"});
    }
} catch(err) {
    res.status(500).json({message: "Something went Wrong!"});
}
});


  router.post('/addProperty', async(req, res)=> {
      try {
          let property = await propertyService.createProperty(req.body);
          if(property?._doc?._id) {
              res.status(200).json({property});
            } else {
                res.status(200).json({message: "No data found"});
      }
    } catch(err) {
        res.status(500).json({message: "Something went Wrong!"});
    }
});

router.put('/updateProperty/:id', async(req, res)=> {
try {
    let property = await propertyService.updatePropertyById(req.params['id'],req.body);
    res.status(200).json({property});
} catch(err) {
    res.status(500).json({message: "Something went Wrong!"});
}
});


router.delete('/deleteProperty/:id', async(req, res)=> {
    try {
      let property = await propertyService.deletePropertyById(req.params['id']);
      if(property) {
        res.status(200).json({property});
      } else {
        res.status(200).json({message: "No data found"});
      }
    } catch(err) {
        res.status(500).json({message: "Something went Wrong!"});
    }
  });

router.get('/detail/:id', async(req, res)=> {

  try {

    const propId = req.params['id']

    if (propId) {

      let response = await houseService.getPropertyDetail(propId)

      if(response){

        res.status(200).json({
          message: 'success',
          status: 200,
          response
        });
      }

    }

  } catch (error) {

    res.status(500).json({
      error,
      message: "Something went Wrong!"
    });

  }

})


module.exports = router

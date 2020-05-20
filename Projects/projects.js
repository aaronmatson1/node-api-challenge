const express = require('express');
const Hubs = require('../data/helpers/projectModel');

const router =  express.Router();

//==========================================================
// CREATE/get
//==========================================================

router.get('/', (req, res) => {
    Hubs.get(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });

//==========================================================
// READ/insert
//==========================================================

router.post('/', (req, res) => {
    Hubs.insert(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });

//==========================================================
// UPDATE
//==========================================================
router.put('/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })

//==========================================================
// DELETE/remove
//==========================================================

router.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });


router.post('/:id/projects', validateProject(), validateProject(), (req, res) => {
    //NEW PROJECT REQUEST METHOD
    const newProject = {
        text: req.body.text,
        project_id: req.params.id,
    }

    projectDb
        .insert(newProject)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) =>{
            res.status(500).json({
                message: "Project post could not be created",
            })
        })
})


'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection');

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if(models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `$(-dirname)/../models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      model.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    } else {
      next('Invalid Model');
    }
  }
});

router.get('/:model', handleGetAll);
router.get('/:model', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model', handleUpdate);
router.delete('/:model', handleDelete);

async function handleGetAll(req, res){
  let allRecords = await req.model.get();
  res.status(200).json(allRecords)
}
async function handleGetOne(req, res){
  const id = req.params.id;
  let theRecored = await req.model.get(id);
  res.status(200).json(theRecored)
}
async function handleCreate(req, res){
  let obj = req.body;
  let newRecord = await req.model.get(obj);
  res.status(201).json(newRecord)
}
async function handleUpdate(req, res){
  const id = req.params.id;
  const obj = req.body;
  let updateRecord = await req.model.get(id, obj);
  res.status(200).json(updateRecord)
}
async function handleDelete(req, res){
  let id = req.params.id;
  let deleteRecord = await req.model.get(id);
  res.status(200).json(deleteRecord)
}
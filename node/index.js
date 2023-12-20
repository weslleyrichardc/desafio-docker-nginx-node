import express from 'express';

import { homeRoute } from './src/controllers/PeopleController.js';

const app = express()
const port = 3000

app.get('/', homeRoute)

app.listen(port, () => console.log('Rodando na porta ' + port))

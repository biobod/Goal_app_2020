const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverConfig = require('../config');
const employeesRouter = require('./routes/employees');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', employeesRouter);

app.listen(serverConfig.port, () => console.log(`Server is running on port ${serverConfig.port}`));
app.on('exit', () => app.close());
app.on('uncaughtException', () => app.close());

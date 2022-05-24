import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';
import { responseTime } from "./src/middleware/reponseTime";
import routes from './src/router/router';

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(responseTime);
app.get('/', async (req, res) => {

  try {
      const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
      const response = await axios.get(url);
      const data = response.data;
      if (data) {
        res.status(200).json({data: data})
      } else {
        res.end('<h1>Error<h1>')
      }
  } catch (err) {
    res.end('<h1>Error<h1>')
  }
});

app.use(routes);

app.listen(PORT, () => {

  console.log("App running on port: " + PORT)

})
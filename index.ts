import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createPDF } from "./pdf-generator"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const data = {
  bgColor: "rgb(172,21,255)",
  title: "Salsa Wars - The Ice Strikes Back",
  date: "01/04/2023",
  people: [
    {
      firstName: "Luke",
      lastName: "Skywalker",
      jedi: true
    },
    {
      firstName: "Anakin",
      lastName: "Skywalker",
      jedi: false
    }
  ]
}

app.get('/', async (req: Request, res: Response) => {
  const html = await createPDF(data)
  res.send(html);
});

app.get('/alternative', async (req: Request, res: Response) => {
  data.bgColor = "rgb(246,197,161)"
  const html = await createPDF(data)
  res.send(html);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

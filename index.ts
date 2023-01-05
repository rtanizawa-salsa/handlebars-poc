import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createPDF } from "./pdf-generator"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const data = {
  title: "Salsa.dev",
  date: "01/04/2023",
  name: "Rafael Tanizawa",
  age: 35,
  birthdate: "04/11/1987"
}

app.get('/', async (req: Request, res: Response) => {
  const html = await createPDF(data)
  res.send(html);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

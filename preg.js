/////////////dkjcoidwc


import express, { Request, Response } from "express";
import path from "path";

const server = express();
const port = 3000;

server.get("/components/weather", function (req: Request, res: Response): void {
  const filePath = path.join(process.cwd(), "public", "weather.xhtml");
  res.setHeader("Content-Type", "text/html");
  res.sendFile(filePath);
});

server.listen(port, function (): void {
  console.log("Escuchando en el puerto " + port);
});

//////
eliminar node-modeles
rm rf node modules

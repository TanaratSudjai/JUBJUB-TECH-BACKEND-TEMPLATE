import type { Request, Response } from 'express';
import { dbError } from '../config/database.js';

export class HomeController {
    public renderStatusPage = (req: Request, res: Response): void => {
        const statusMessage = dbError
            ? `<p style="color: red; font-weight: bold; font-size: 1.5rem;">Database Error: ${dbError}</p>`
            : `<p style="color: green; font-weight: bold; font-size: 1.5rem;">SERVER RUNNING เเล้วจ๊าาาาา ~</p>`;

        const imageSrc = dbError ? "/error.png" : "/start.png";

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome!</title>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Comic Sans MS', 'Arial', sans-serif;
                    text-align: center;
                }
                .container {
                    background: white;
                    padding: 40px;
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }
                img {
                    max-width: 300px;
                    transition: transform 0.3s ease-in-out;
                }
                img:hover {
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="${imageSrc}" alt="Status Image" onerror="this.style.display='none'">
                ${statusMessage}
            </div>
        </body>
        </html>
      `);
    }
}

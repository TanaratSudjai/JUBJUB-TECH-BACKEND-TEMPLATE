import type { Request, Response } from 'express';
import { dbError } from '../config/database.js';

export class HomeController {
    public renderStatusPage = (req: Request, res: Response): void => {
        const statusMessage = dbError
            ? `<p class="floating-text error-text">Database Error: ${dbError}</p>`
            : `<p class="floating-text success-text">SERVER BACKEND STARTED ~</p>`;

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
                    background-color: #f7f7f7;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    text-align: center;
                    color: #333;
                }
                .container {
                    background: white;
                    padding: 50px 40px;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                img {
                    max-width: 280px;
                    transition: transform 0.3s ease;
                    margin-bottom: 20px;
                }
                img:hover {
                    transform: scale(1.03);
                }
                .floating-text {
                    font-size: 1.6rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                    margin-top: 15px;
                    animation: float 3s ease-in-out infinite;
                }
                .success-text {
                    color: #2e303e; /* เรียบๆ ไม่ฉูดฉาด */
                }
                .error-text {
                    color: #d32f2f;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
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

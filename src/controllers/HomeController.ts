import type { Request, Response } from 'express';
import { dbError } from '../config/database.js';

export class HomeController {
    public renderStatusPage = (req: Request, res: Response): void => {
        const statusMessage = dbError
            ? `<h1 class="main-text error-text">Database Error</h1><p class="sub-text">${dbError}</p>`
            : `<h1 class="main-text success-text">ระบบหลังบ้าน พร้อมสำหรับผู้เข้าร่วมเเล้ว</h1><p class="sub-text">JubJub Tech API Service is up and running.</p>`;

        const imageSrc = dbError ? "/error.png" : "/start.png";

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JubJub Tech Backend</title>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #fafafa;
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    text-align: center;
                    color: #1a1a1a;
                    overflow: hidden;
                    position: relative;
                }
                
                /* Decorative Background Images */
                .deco-img {
                    position: absolute;
                    z-index: 0;
                    opacity: 0.8;
                    animation: floatBg 6s ease-in-out infinite alternate;
                }
                .deco-1 { top: 12%; left: 15%; width: 140px; animation-delay: 0s; }
                .deco-2 { bottom: 15%; right: 15%; width: 180px; animation-delay: 1.5s; }
                .deco-3 { top: 20%; right: 12%; width: 90px; opacity: 0.6; animation-delay: 0.5s; }
                .deco-4 { bottom: 18%; left: 18%; width: 120px; opacity: 0.7; animation-delay: 2s; }

                .container {
                    background: #ffffff;
                    padding: 50px 45px;
                    border-radius: 20px;
                    border: 1px solid #f0f0f0;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.03), 0 5px 15px rgba(0,0,0,0.02);
                    animation: fadeIn 0.8s ease-out forwards;
                    max-width: 450px;
                    width: 90%;
                    position: relative;
                    z-index: 10;
                }
                .logo-img {
                    width: 48px;
                    margin-bottom: 20px;
                    opacity: 0.8;
                }
                .main-img {
                    max-width: 240px;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    margin-bottom: 25px;
                }
                .main-img:hover {
                    transform: scale(1.05);
                }
                .main-text {
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                    margin: 10px 0;
                }
                .sub-text {
                    font-size: 1rem;
                    color: #888;
                    margin: 0;
                    font-weight: 400;
                }
                .success-text {
                    color: #111;
                }
                .error-text {
                    color: #d32f2f;
                }
                
                @keyframes floatBg {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>
            <!-- Background Decoration Images -->
            <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='40' fill='%23f0f2f5'/></svg>" class="deco-img deco-1" alt="">
            <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='60' height='60' x='20' y='20' rx='15' fill='%23f3f4f6' transform='rotate(45 50 50)'/></svg>" class="deco-img deco-2" alt="">
            <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><polygon points='50,10 90,90 10,90' fill='%23f8f9fa'/></svg>" class="deco-img deco-3" alt="">
            <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='30' fill='none' stroke='%23ebebeb' stroke-width='8'/></svg>" class="deco-img deco-4" alt="">

            <div class="container">
                <!-- Top Logo Image -->
                <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' fill='none' stroke='%23333' stroke-width='1.5' stroke-linejoin='round'/></svg>" class="logo-img" alt="Logo">
                
                <br>
                <!-- Main Status Image -->
                <img src="${imageSrc}" alt="Status Image" class="main-img" onerror="this.style.display='none'">
                
                ${statusMessage}
            </div>
        </body>
        </html>
      `);
    }
}

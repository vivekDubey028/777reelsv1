const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let lines = 8; // Initial line value
let totalBet = 0; // Initial total bet value
const betPerLine = 1; // Assuming constant bet per line for simplicity

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (typeof drawBottomBar === 'function') drawBottomBar();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const barImage = new Image();
barImage.onload = () => {
    function drawBottomBar() {
        if (barImage.complete) {
            const scale = Math.min(canvas.width / barImage.width, canvas.height / 4 / barImage.height);
            const barWidth = barImage.width * scale;
            const barHeight = barImage.height * scale;
            const barX = (canvas.width - barWidth) / 2;
            const barY = canvas.height - barHeight;

            ctx.drawImage(barImage, barX, barY, barWidth, barHeight);

            // Update line and total bet display text
            ctx.fillStyle = '#fff';
            ctx.font = `${12 * scale}px Arial`;
            ctx.fillText(`LINES: ${lines}`, barX + 40 * scale, barY + barHeight / 2);
            ctx.fillText(`TOTAL PLAY: ${totalBet}`, barX + 90 * scale, barY + barHeight / 2);
            

            // Invisible button hit areas (scaled coordinates)
            const buttons = [
                { id: 'info',         x: barX + 10 * scale, y: barY + 10 * scale, width: 40 * scale, height: 30 * scale },
                { id: 'lines',        x: barX + 60 * scale, y: barY + 10 * scale, width: 50 * scale, height: 30 * scale },
                { id: 'adjust-minus', x: barX + 120 * scale, y: barY + 10 * scale, width: 30 * scale, height: 30 * scale },
                { id: 'line-play',    x: barX + 160 * scale, y: barY + 10 * scale, width: 50 * scale, height: 30 * scale },
                { id: 'adjust-plus',  x: barX + 220 * scale, y: barY + 10 * scale, width: 30 * scale, height: 30 * scale },
                { id: 'total-play',   x: barX + 260 * scale, y: barY + 10 * scale, width: 60 * scale, height: 30 * scale },
                { id: 'win',          x: barX + 330 * scale, y: barY + 10 * scale, width: 80 * scale, height: 30 * scale },
                { id: 'fast',         x: barX + 420 * scale, y: barY + 10 * scale, width: 60 * scale, height: 30 * scale },
                { id: 'spin',         x: barX + 490 * scale, y: barY,             width: 130 * scale, height: barHeight }
            ];


            canvas.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                buttons.forEach(button => {
                    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
                        console.log(`${button.id} button clicked`);
                        if (button.id === 'adjust') {
                            if (x < barX + 130 * scale && lines > 1) {
                                lines--;
                            } else if (lines < 20) {
                                lines++;
                            }
                            totalBet = lines * betPerLine; // Update total bet based on lines
                            drawBottomBar(); // Redraw to update display
                        }
                        if (button.id === 'fast') console.log('Fast mode');
                        if (button.id === 'spin') console.log('Spin action');
                    }
                });
            });
        }
    }
    drawBottomBar();
};
barImage.src = 'public/WhatsApp Image 2025-06-25 at 22.26.31_b127b430.jpg';
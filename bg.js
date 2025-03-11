const canvas = document.getElementById("gridCanvas");
        const ctx = canvas.getContext("2d");

        let gridSize = 40; // Size of grid squares
        let offsetX = 0, offsetY = 0; // Scroll offsets
        let hue = 0; // Starting hue value for rainbow effect

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 1;

            let cols = Math.ceil(canvas.width / gridSize) + 1;
            let rows = Math.ceil(canvas.height / gridSize) + 1;

            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    let xPos = x * gridSize - offsetX;
                    let yPos = y * gridSize - offsetY;

                    ctx.strokeStyle = `hsl(${(hue + x * 10 + y * 10) % 360}, 100%, 60%)`;
                    ctx.strokeRect(xPos, yPos, gridSize, gridSize);
                }
            }
        }

        function update() {
            offsetX += 0.5; // Controls diagonal scrolling speed (X)
            offsetY += 0.5; // Controls diagonal scrolling speed (Y)
            hue += 1; // Adjusts the color change speed

            if (offsetX >= gridSize) offsetX = 0;
            if (offsetY >= gridSize) offsetY = 0;

            drawGrid();
            requestAnimationFrame(update);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        update();
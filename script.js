


window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 600;
	canvas.height = 800;
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 3;


	class Robot {
		constructor(canvas) {
			this.canvas = canvas;
			this.x = this.canvas.width * 0.5;
			this.y = this.canvas.height * 0.5;
			this.radius = 80;
			this.angle = 0;
			this.bodyImage = document.getElementById('body');
			this.eye1Image = document.getElementById('eye1');
			this.eye2Image = document.getElementById('eye2');
			this.reflectionImage = document.getElementById('reflection');
			this.mouse = {
				x: 0,
				y: 0
			}
			this.canvas.addEventListener('mousemove', e => {

				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			});
		}

		draw(context) {
			//body
			//рисуем изображение 
			context.drawImage(this.bodyImage, this.x - this.bodyImage.width * 0.5 + 65, this.y - this.bodyImage.height * 0.5 - 53);
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.stroke();
			//eye1
			context.drawImage(this.eye1Image, this.x + Math.cos(this.angle) * this.radius * 0.35 - this.eye1Image.width * 0.5, this.y + Math.sin(this.angle) * this.radius * 0.35 - this.eye1Image.width * 0.5);
			context.beginPath();
			context.arc(this.x + Math.cos(this.angle) * this.radius * 0.35, this.y + Math.sin(this.angle) * this.radius * 0.35, this.radius * 0.6, 0, Math.PI * 2);
			context.stroke();
			//eye2
			context.beginPath();
			context.arc(this.x + Math.cos(this.angle) * this.radius * 0.6, this.y + Math.sin(this.angle) * this.radius * 0.6, this.radius * 0.3, 0, Math.PI * 2);
			context.stroke();
		}
		update() {
			//углы вокруг объектов
			const dx = this.mouse.x - this.x;
			const dy = this.mouse.y - this.y;
			// находим угол
			this.angle = Math.atan2(dy, dx);


			//this.x = this.mouse.x;
			//this.y = this.mouse.y;
		}

	}
	const robot = new Robot(canvas);




	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		robot.draw(ctx);
		robot.update();
		requestAnimationFrame(animate);
	}
	animate();



});
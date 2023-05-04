


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
			this.angle = 80;
			this.mouse = {
				x: 0,
				y: 0
			}
			this.canvas.addEventListener('mousemove', e => {
				console.log(this.angle);
				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			});
		}

		draw(context) {
			//body
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.stroke();
			//eye1
			context.beginPath();
			context.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
			context.stroke();
			//eye2
			context.beginPath();
			context.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
			context.stroke();
		}
		update() {

			const dx = this.mouse.x - this.x;
			const dy = this.mouse.y - this.y;
			// находим угол
			this.angle = Math.atan2(dx, dy);


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
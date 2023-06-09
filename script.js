


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
			this.centerX = this.x;
			this.centerY = this.y;
			this.radius = 80;
			this.angle = 0;
			this.spriteWidth = 370;
			this.spriteHeight = 370;
			this.frameX = 0;
			this.maxFrame = 73;
			this.bodyImage = document.getElementById('body');
			this.bodySprite = document.getElementById('bodySprite');
			this.eye1Image = document.getElementById('eye1');
			this.eye2Image = document.getElementById('eye2');
			this.reflectionImage = document.getElementById('reflection');

			this.detectorLightImage = document.getElementById('detectorLight');

			this.eye1Radius = this.radius * 0.4;
			this.eye2Radius = this.radius * 0.65;

			this.eye1Distance = this.eye1Radius;
			this.eye2Distance = this.eye2Radius;
			this.tracking = false;

			this.movementAngle = 0;
			this.mouse = {
				x: 0,
				y: 0
			}
			this.canvas.addEventListener('mousemove', e => {

				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
				this.tracking = true;
			});
			this.canvas.addEventListener('mouseleave', e => {

				this.tracking = false;
			});
		}

		draw(context) {
			//body
			//рисуем изображение 
			context.drawImage(this.bodySprite, this.frameX * this.spriteWidth, 0, this.spriteHeight, this.spriteWidth, this.x - this.bodyImage.width * 0.5 + 65, this.y - this.bodyImage.height * 0.5 - 53, this.spriteHeight, this.spriteWidth);

			//eye1
			context.drawImage(this.eye1Image, this.x + Math.cos(this.angle) * this.eye1Radius - this.eye1Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye1Radius - this.eye1Image.width * 0.5);

			//eye2
			context.drawImage(this.eye2Image, this.x + Math.cos(this.angle) * this.eye2Radius - this.eye2Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye2Radius - this.eye2Image.width * 0.5);
			//reflection
			//рисуем изображение 
			context.drawImage(this.reflectionImage, this.x - this.reflectionImage.width * 0.5, this.y - this.reflectionImage.height * 0.5);
			//etectorLightImage
			if (this.tracking) {
				context.drawImage(this.detectorLightImage, this.x - this.detectorLightImage.width * 0.5, this.y - this.detectorLightImage.height * 0.5 - 195);
			}

		}
		update() {
			//углы вокруг объектов
			const dx = this.mouse.x - this.x;
			const dy = this.mouse.y - this.y;

			const distance = Math.hypot(dx, dy);

			// находим угол
			this.angle = Math.atan2(dy, dx);

			if (distance <= this.eye1Distance * 2.5) {
				this.eye1Radius = distance * 0.4;
				this.eye2Radius = distance * 0.65;
			} else if (this.tracking) {
				this.eye1Radius = this.eye1Distance;
				this.eye2Radius = this.eye2Distance;
			} else {
				this.eye1Radius = this.eye1Distance * Math.cos(this.movementAngle);
				this.eye2Radius = this.eye2Distance * Math.cos(this.movementAngle);
			}



			//sprite animation
			//if (this.frameX >= this.maxFrame) {
			//	this.frame = 0
			//} else {
			//	this.frameX++;
			//}

			this.frameX > this.maxFrame ? this.frameX = 0 : this.frameX++;
			this.movementAngle += 0.05;

			this.x = this.centerX + Math.cos(this.movementAngle * 3) * 80;

			this.y = this.centerY + Math.sin(this.movementAngle * 0.5) * 150;
			console.log(this.movementAngle);
			if (this.movementAngle > Math.PI * 4) {
				console.log('reset')
				this.movementAngle = 0;
			}


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
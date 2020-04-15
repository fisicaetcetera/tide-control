//Nessa versão, vou colocar minha imagem como fundo
//let cam;

let video;

let poseNet;
let noseX = 0,
  noseY = 0;
let rwristYav = 300;

let earthjpg;
let moonjpg;
let sunjpg;
let assinatura;
let posx = -200,
  posz = 100;

function preload() {
  earthjpg = loadImage('earthcloud-1.jpg');
  moonjpg = loadImage('moonmap1k.jpg');
  sunjpg = loadImage('sun-1.jpg');
}

function setup() {
  createCanvas(1280, 770, WEBGL);

  //console.log(ml5);

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', tenhoPoses);

  assinatura = createGraphics(380, 100);
  assinatura.background(255, 100);
  assinatura.fill(0);
  assinatura.textAlign(CENTER);
  assinatura.textSize(90);
  assinatura.text('Bonelli', 190, 85);
}

function modelReady() {
  console.log('O modêlo está pronto!');
}

function tenhoPoses(poses) {
  console.log(poses);
  rwristY = poses[0].pose.keypoints[10].position.y;
  rwristYav = (rwristYav + rwristY)/2;
  console.log(rwristYav);
}

function draw() {
  background(0);
  //fill(255, 0, 0); 
  //sphere(noseX, noseY, 0, 50);

  //translate(0,0,mouseX);
  //push();
  //translate(200, -150, 0);
  //scale(-1.0, 1.0);
  //texture(video);
  //plane(150);
  //pop();

  push();
  texture(assinatura);
  translate(posx++, 50, posz--);
  rotateY(frameCount / 95);
  rotateX(frameCount / 130);
  plane(50, 30);
  pop();
  //directionalLight(255, 255, 255, 1, 0, 0)
  //pointLight(255,255,0,0,0,200);

  push();

  texture(earthjpg);
  //rotateY(frameCount / 3280);
  rotateY(frameCount/(Math.floor(rwristYav)));
  sphere(160 );

  rotateY(-frameCount / 1450);
  translate(0, 0, -200);
  texture(moonjpg);
  sphere(12);

  pop();

  push();
  rotateY(frameCount / 1500);
  translate(0, 0, -1000);
  texture(sunjpg);
  sphere(25);
  pop();

}

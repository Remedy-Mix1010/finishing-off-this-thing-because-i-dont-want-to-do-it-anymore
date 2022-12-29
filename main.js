muffin = ""
boyfriend = ""
song_1_Starus = ""
song_2_Starus = ""

left_wrist_x= 0
right_wrist_x=0
left_wrist_y = 0
right_wrist_y= 0 
score_right_wrist = 0
score_left_wrist = 0

function preload(){
muffin = loadSound("muffin.mp3")
boyfriend = loadSound("new.mp3")
}

function setup(){
    canvas = createCanvas(200,150)
    canvas.position(1025,160)
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded); 
    posenet.on('pose', gotPoses);   
}

function modelLoaded(){
    console.log('Posenet is initialized')
}

function gotPoses(results){
if(results.length > 0){
    console.log(results)

score_left_wrist = results[0].pose.keypoints[9].score;
score_right_wrist = results[0].pose.keypoints[10].score;
right_wrist_x = results[0].pose.rightWrist.x;
right_wrist_y = results[0].pose.rightWrist.y;
left_wrist_x = results[0].pose.leftWrist.x;
left_wrist_y = results[0].pose.leftWrist.y;
}
}

function draw(){
    image(video, 0,0, 200, 150)
    fill("#884794")
    stroke("#884794")
    song_1_Starus = muffin.isPlaying()
    song_2_Starus = boyfriend.isPlaying()
    if(score_left_wrist > 0.2){
        circle(left_wrist_x, left_wrist_y, 20)
        boyfriend.stop();
        if(song_1_Starus = false){
            muffin.play()
        }
    }
    if(score_right_wrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20)
        muffin.stop();
        if(song_2_Starus = false){
            boyfriend.play()
        }
    }
}

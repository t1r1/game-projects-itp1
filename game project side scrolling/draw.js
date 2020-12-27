function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	noStroke();
    fill(78, 191, 239);
    
    // a cloud
    ellipse(cloud.x_pos, cloud.y_pos - 3, cloud.width * 2, cloud.height + 20);
    ellipse(cloud.x_pos - 50, cloud.y_pos, cloud.width - 5, cloud.height - 10);
    ellipse(cloud.x_pos + 50, cloud.y_pos, cloud.width, cloud.height);
    
    // the shadow
    fill(255);
    ellipse(cloud.x_pos, cloud.y_pos, cloud.width + 50, cloud.height + 26);
    ellipse(cloud.x_pos - 50, cloud.y_pos, cloud.width - 10, cloud.height - 15);
    ellipse(cloud.x_pos + 50, cloud.y_pos, cloud.width, cloud.height);


	//2. a mountain in the distance
    beginShape();
    fill(108, 132, 144); 
    vertex(mountains.mountain_x_pos, 432);
    vertex(mountains.mountain_x_pos + 200, mountains.mountain_y_pos + 50);
    vertex(mountains.mountain_x_pos + 400, mountains.mountain_y_pos + 232);
    endShape();
    
    
    beginShape();
    fill(90, 69, 60); 
    vertex(mountains.mountain_x_pos, mountains.mountain_y_pos + 232);
    vertex(mountains.mountain_x_pos + 100, mountains.mountain_y_pos + 100);
    vertex(mountains.mountain_x_pos + 200, mountains.mountain_y_pos + 232);
    endShape();
    
    beginShape();
    fill(202, 218, 225);
    
    vertex(mountains.snow_x_pos, mountains.snow_y_pos); // snow on the mountain, top point
    vertex(mountains.snow_x_pos - 29, mountains.snow_y_pos + 35); // snow on the mountain, to the left and bottom
    vertex(mountains.snow_x_pos + 50, mountains.snow_y_pos + 60); // snow on the mountain, from the left to the right
    vertex(mountains.snow_x_pos + 47, mountains.snow_y_pos + 43); //snow on the mountain, from the left to the right
    
    endShape();
    
    fill(122, 114, 114); 

	//3. a tree

	noStroke();
	fill(255);
    fill(69, 38, 38);
    rect(treePos_x, treePos_y, 35, 132);
    stroke(69, 38, 38);
    
    line(treePos_x + 35, treePos_y + 64, treePos_x + 60, treePos_y + 40);
    line(treePos_x, treePos_y + 90, treePos_x - 20, treePos_y + 40);
            
    noStroke(); 

    fill(54, 202, 79);
    triangle(treePos_x - 30, treePos_y + 19, treePos_x + 18, treePos_y -100, treePos_x + 70, treePos_y + 19);

	//4. a canyon
    
	noStroke();
	fill(255);
    
    fill(100, 155, 255);
    rect(canyon.x_pos, canyon.x_pos + 312, canyon.width, canyon.width + 30);
    fill(37, 0, 225);
    rect(120, 530, 120, 130);
    
    triangle(130, 530, 140, 510, 150, 530);
    
    triangle(180, 530, 200, 510, 210, 530);
    triangle(28, 548, 115, 412); // water

	//5. a collectable token

    strokeWeight(4);
    stroke(208, 103, 33);
    fill(250, 237, 54);
    ellipse(collectible.x_pos, collectible.y_pos, collectible.size - 10, collectible.size);
    fill(0);
    textSize(16);
    text("$", collectible.x_pos - 5, collectible.y_pos + 6);
    
    // the character
 
    //head
    stroke(0);
    
    fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 50, 35);
    ellipse(gameChar_x, gameChar_y - 65, 3);
    ellipse(gameChar_x + 3, gameChar_y - 65, 3);
    ellipse(gameChar_x - 3, gameChar_y - 65, 3);
    
    // face
    fill(0);
    rect(gameChar_x - 5, gameChar_y - 50, 10, 1);
    
    // body
    fill(255, 203, 0);
    stroke(0);
    rect(gameChar_x - 13, gameChar_y - 35, 26, 30);
    
    //feet
    fill(0);
    rect(gameChar_x -15, gameChar_y -5, 10, 10);
    rect(gameChar_x +5, gameChar_y -5, 10, 10);
    
    // hands
    fill(200, 150, 150);
    rect(gameChar_x -23, gameChar_y -33, 10, 10);
    rect(gameChar_x +13, gameChar_y -33, 10, 10);

}
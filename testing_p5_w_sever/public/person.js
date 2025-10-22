class Person{
    constructor(data){
        this.data = data;
        this.x = random(0,width);
        this.y = random(0,height);
        this.hue = random(0,360);
    }

    update() {
        fill(this.hue, 60, 100); //hue (0-360), saturation (0-100), brightness (0-100)
        ellipse(this.x, this.y, 50);    
        console.log(this.data);
        textAlign(CENTER);
        fill(0,0,0);
        text(this.data.name, this.x, this.y);
    }
}
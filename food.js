class Food{

    constructor(){

        this.image = loadImage("Milk.png");

        this.foodStock = 0;
        this.lastFed;
    }

    updateFoodStock(foodStock){

        this.foodStock = foodStock;

    }

    deductFood(){

        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }

    }

    getFoodStock(){

        return this.foodStock;

    }

    display(){

        //background(255, 255, 254);

        var x = 50, y = 70;

        imageMode(CENTER);
        //image(this.image, 720, 220, 70, 70);

        if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 50;
                    y = y + 100;
                }

                image(this.image, x, y, 50, 50);
                x = x + 50;
            }
        }
    }

    bedroom(){
        
        background(bedImg, 550, 650);
    }

    garden(){
        background(gardenImg, 550, 650);
    }
    
    washroom(){
        background(washroomImg, 550, 650);
    }
    
    
}
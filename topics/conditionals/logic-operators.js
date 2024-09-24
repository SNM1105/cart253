//If there is freezing rain and it's dark
//Then I will stay at home

if (thereIsFreezingRain) {
    if(lightLevel < 10) {
        stayAtHome();
    }
}

if (thereIsFreezingRain && lightLevel < 10) {
    stayAtHome();
}

//These two are the same thing
//&& = AND

//if there is freezing rain OR there is deep snow
//then I will stay at home

if (thereIsFreezingRain) {
    stayAtHome();
}
if(snowLevel > 5) {
    stayAtHome();
}

if (thereIsFreezingRain || snowLevel > 5){
    stayAtHome
}

// || = OR


//If tere is not freezing rain, then i'll go for a walk

if (thereIsFreezingRain) {
    stayAtHome
}
else {
    goForAWalk();
}

// Better construction

if (!thereIsFreezingRain) {
    goForWalk();
}

// ! = NOT
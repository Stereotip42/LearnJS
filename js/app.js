// Selectors for counters
const TOTAL = 'total-zombies';
const DEAD = 'dead-zombies';
const SMALL = 'small-zombies';
const MAD = 'mad-zombies';
const STRONG = 'strong-zombies';

let counters = {
    [TOTAL]: 0,
    [DEAD]: 0,
    [SMALL]: 0,
    [MAD]: 0,
    [STRONG]: 0,
};

let calculateZombies = () => {
    let totalCounter = 0;

    zombiesData.map((zombieHP) => {
        let zombieType = getZombieType(zombieHP);
        let counter = counters[zombieType];

        counters[zombieType] = ++counter;

        totalCounter++;
    });

    counters[TOTAL] = totalCounter;
};

let getZombieType = (incomingHP) => {
    let hp = parseInt(incomingHP);

    let isNumeric = typeof hp === 'number';

    if (!isNumeric || hp < 1) {
        return DEAD;
    }

    if (hp < 11) {
        return SMALL;
    }

    if (hp > 10 && hp < 21) {
        return MAD;
    }

    if (hp > 20) {
        return STRONG;
    }

    return DEAD;
};

let outputData = () => {
    for (let className in counters) {
        let counter = counters[className];
        let elementForCounter = document.getElementsByClassName(className);

        if (elementForCounter.length) {
            // Output to html
            elementForCounter[0].innerHTML += '{' + counter + '}';

            // Output to console
            console.log(elementForCounter[0].textContent);
        }
    }
};

calculateZombies();
outputData();
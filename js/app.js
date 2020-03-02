// Selectors for counters
const TOTAL = 'total-zombies';
const DEAD = 'dead-zombies';
const SMALL = 'small-zombies';
const MAD = 'mad-zombies';
const STRONG = 'strong-zombies';

const counters = {
    [TOTAL]: 0,
    [DEAD]: 0,
    [SMALL]: 0,
    [MAD]: 0,
    [STRONG]: 0,
};

const getZombieType = (hp) => {

    let isNumeric = !isNaN(hp) && hp !== null;

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

// Calculate zombies by types
let totalCounter = 0;

for (let zombieHP of zombiesData) {
    let zombieType = getZombieType(zombieHP);
    let counter = counters[zombieType];

    counter++;
    counters[zombieType] = counter;

    totalCounter++;
}

counters[TOTAL] = totalCounter;

// Output data
for (let className in counters) {
    const counter = counters[className];
    const elementForCounter = document.getElementsByClassName(className);

    if (elementForCounter.length) {
        const output = `${elementForCounter[0].innerHTML} {${counter}}`;

        // Output to html
        elementForCounter[0].innerHTML = output;

        // Output to console
        console.log(output);
    }
}

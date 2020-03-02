document.addEventListener('DOMContentLoaded', () => {
    const iconsDir = 'icons';
    const iconExtension = 'gif';
    const zombiesSelector = '.zombies';
    const typeDeadZombie = 0;
    const srcDeadZombie = `${iconsDir}/${typeDeadZombie}.${iconExtension}`;

    function outputZombies() {
        const zombieContainer = document.querySelector(zombiesSelector);

        for (let zombieData of zombies) {
            const zombieItem = document.createElement('img');
            zombieItem.classList.add('zombie-item');

            zombieItem.src = `${iconsDir}/${zombieData.type}.${iconExtension}`;

            zombieContainer.appendChild(zombieItem);

            zombieItem.addEventListener('click', () => {
                zombieItem.src = srcDeadZombie;
            });
        }
    }

    outputZombies();
});
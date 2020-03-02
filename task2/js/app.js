document.addEventListener('DOMContentLoaded', () => {
    let iconName = 'zombie-dead';
    const iconsDir = 'icons';
    const iconExtension = 'gif';
    const zombiesSelector = '.zombies';
    const srcDeadZombie = `${iconsDir}/${iconName}.${iconExtension}`;
    const zombieContainer = document.querySelector(zombiesSelector);

    for (let zombieData of zombies) {
        const zombieItem = document.createElement('img');
        zombieItem.classList.add('zombie-item');

        switch (zombieData.type) {
            case ZOMBIE_TYPE.SMALL:
                iconName = 'zombie-small';
                break;
            case ZOMBIE_TYPE.MAD:
                iconName = 'zombie-mad';
                break;
            case ZOMBIE_TYPE.STRONG:
                iconName = 'zombie-strong';
                break;
            default:
                iconName = 'zombie-dead';
                break;
        }

        zombieItem.src = `${iconsDir}/${iconName}.${iconExtension}`;

        zombieContainer.appendChild(zombieItem);

        zombieItem.addEventListener('click', () => {
            zombieItem.src = srcDeadZombie;
        });
    }
});
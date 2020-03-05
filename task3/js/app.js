document.addEventListener('DOMContentLoaded', () => {
    const hpBarWidth = 100;
    const iconsDir = 'icons';
    const iconExtension = 'gif';
    const zombiesSelector = '.zombies';
    const zombieContainer = document.querySelector(zombiesSelector);
    const hpBarClass = 'hp-bar';
    const counterClass = 'zombies-status';
    let iconName = 'zombie-dead';


    let game = {
        zombie: {
            cursor: 0,
            current: {},
            health: {
                current: 0,
                bar: {
                    recreate() {
                        // Delete bar if exists
                        this.delete();

                        // Create new bar
                        const hpBarItem = document.createElement('div');

                        hpBarItem.style.width = `${hpBarWidth}px`;
                        hpBarItem.style.height = '8px';
                        hpBarItem.style.border = '1px solid grey';
                        hpBarItem.style['background-color'] = 'green';
                        hpBarItem.classList.add(hpBarClass);

                        zombieContainer.before(hpBarItem);
                    },

                    delete() {
                        game.delete(hpBarClass);
                    },

                    actualize() {
                        const hpBar = document.querySelector(`.${hpBarClass}`);
                        const current = game.zombie.health.current;

                        const percentOfHealth = (current * 100) / game.zombie.current.health;
                        const newWidth = hpBarWidth * (percentOfHealth / 100);

                        hpBar.style.width = `${newWidth}px`;
                    },
                },
            },
            counter: {
                actualize() {
                    let counterItem = document.querySelector('.zombies-status');

                    if (counterItem) {
                        counterItem.children[0].innerHTML = game.zombie.cursor + 1;
                        counterItem.children[1].innerHTML = zombies.length;
                    }
                },
                delete() {
                    game.delete(counterClass);
                },
            },

            draw() {
                const zombie = this.getZombie();

                if (!zombie) {
                    game.zombie.health.bar.delete();
                    game.zombie.counter.delete();
                    game.done();
                    return;
                }

                const zombieItem = document.createElement('img');
                const iconName = this.getIcon();

                zombieItem.src = `${iconsDir}/${iconName}.${iconExtension}`;

                zombieContainer.innerHTML = '';
                zombieContainer.appendChild(zombieItem);

                this.setHP(zombie.health);
                this.setZombie(zombie);

                zombieItem.addEventListener('click', () => {
                    this.click();
                });
            },

            click() {
                this.damage(HIT_DAMAGE);

                if (this.isAlive()) {
                    this.health.bar.actualize();
                } else {
                    this.killZombie();
                    this.health.bar.delete();

                    setTimeout(() => {
                        game.zombie.health.bar.recreate();
                        this.nextZombie();
                        this.draw();
                        game.zombie.counter.actualize();
                    }, 2000);
                }
            },

            getIcon() {
                let zombie = this.getZombie();

                // Is alive zombie
                if (zombie) {
                    switch (zombie.type) {
                        case ZOMBIE_TYPE.SMALL:
                            iconName = 'zombie-small';
                            break;
                        case ZOMBIE_TYPE.MAD:
                            iconName = 'zombie-mad';
                            break;
                        case ZOMBIE_TYPE.STRONG:
                            iconName = 'zombie-strong';
                            break;
                    }
                }

                return iconName;
            },

            getZombie() {
                return zombies[this.cursor];
            },

            damage(damage) {
                this.health.current = this.health.current - damage;
            },

            nextZombie() {
                this.cursor++;
            },

            setHP(hp) {
                this.health.current = hp;
            },

            isAlive() {
                return this.health.current > 0;
            },

            setZombie(currentZombie) {
                this.current = currentZombie;
            },

            killZombie() {
                // Show icon for dead zombie
                const zombieItem = document.querySelector('img');
                const iconName = 'zombie-dead';

                zombieItem.src = `${iconsDir}/${iconName}.${iconExtension}`;
            },
        },

        done() {
            zombieContainer.innerHTML = 'Done';
        },

        delete(className) {
            if (document.querySelector(`.${className}`)) {
                let bar = document.querySelector(`.${className}`);
                bar.parentNode.removeChild(bar);
            }
        },
    };


    // Draw first zombie
    game.zombie.draw();
    game.zombie.health.bar.recreate();
    game.zombie.counter.actualize();
});
const typingSoundEffect = require("../../sound/320571__mlekoman__type-writing.wav");
const audioEffect = new Audio(typingSoundEffect);

/**
 * Starts playing the typewriter sound
 * effect
 */
export const playSoundEffect = () => {
    audioEffect.play();
};

/**
 * Stops playing the typewriter sound
 * effect
 */
export const stopSoundEffect = () => {
    audioEffect.pause();
    audioEffect.currentTime = 0;
};

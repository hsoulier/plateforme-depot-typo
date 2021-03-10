import "./lib/drop-file.js"
import "./lib/confetti.js"

if (document.querySelector(".success")) {
    const confetti = new ConfettiGenerator({target: document.querySelector("canvas")})
    confetti.render()
}

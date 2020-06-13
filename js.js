const time = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

const watch = new Stopwatch(time);
let msStep = 1;


resetBtn.addEventListener("click", function () {
    watch.reset();
})

const msStepValues = [10, 50, 100, 200, 250, 500];

const stepButtons = [];

msStepValues.forEach(step => {
    stepButtons.push({step, el: document.getElementById(step.toString())});
});

const toggleBtn = document.getElementById("1")

const clearButtonsSelection = () => {
    stepButtons.forEach(button => {
        button.el.classList.remove("pause");
        button.el.classList.remove("selected");
    });
}

stepButtons.forEach(button => {
    button.el.addEventListener("click", (el) => {
        msStep = button.step;
        if (watch.isOn) {
            watch.stop();
            button.textContent = "Start";
            clearButtonsSelection();
            button.el.classList.add("pause");
        } else {
            watch.start(msStep);
            button.textContent = "Stop";
            clearButtonsSelection();
            button.el.classList.add("selected");
        }
    })
});


function Stopwatch(elem) {
    let time = 0;
    let interval;
    let offset;
    this.isOn = false;


    update = () => {
        if (this.isOn) {
            time += delta();
        }
        const formattedTime = timeFormatter(time);
        elem.innerHTML = formattedTime;
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds();

        const ms = (Math.round(milliseconds / msStep)).toString();


        let coloredNumbers = ms.split("")
            .map(n => `<span class='colored-num-${n}'>${n}</span>`)
            .join('')


        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }
        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }

        console.log(msStep, ms.split(""))
        if ((msStep === 10 || msStep === 50) && ms.split("").length === 1) {
            coloredNumbers += "<span class='colored-num-0'>0</span>";
        }

        return minutes + ":" + seconds + "." + coloredNumbers;
    }

    this.start = (step) => {
        console.log("step", step)
        if (!this.isOn) {
            interval = setInterval(update.bind(this), step);
            offset = Date.now();
            this.isOn = true;
        }
    };
    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };
    this.reset = function () {
        time = 0;
        update();
    };
}

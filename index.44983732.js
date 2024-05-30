$(document).ready(function() {
    console.log("jQuery is working!");
});
$(document).ready(function() {
    $(".theme-toggle").on("click", function() {
        $("body").toggleClass("dark-theme");
    });
});
let exercisesStatus = "waiting";
let timerStart = null;
let stepId = null;
let currentStep = 1;
let exercise = "relax";
let timer = null;
function changeStep() {
    stepId = "#step" + currentStep;
    $(stepId).addClass("step_active");
    setTimeout(function() {
        document.querySelector(".step_active").scrollIntoView();
    }, 500);
}
function runTimer(f) {
    timerStart = Date.now();
    let countdown = setInterval(function() {
        if (exercisesStatus === "started") {
            let now = Date.now();
            let difference = now - timerStart;
            let left = Math.ceil((timer - difference) / 1000);
            if (left >= 0) {
                if (left > 9) $(".exercise_active .time").text("00:" + left);
                else $(".exercise_active .time").text("00:0" + left);
            } else {
                clearInterval(countdown);
                f();
            }
        } else {
            clearInterval(countdown);
            if (exercise === "tense") $(".exercise_active .time").text("00:05");
            else $(".exercise_active .time").text("00:00");
        }
    }, 1000);
}
function runTense() {
    exercise = "tense";
    timer = 5000;
    $(stepId + " .tense").addClass("exercise_active");
    runTimer(function() {
        $(stepId + " .tense").removeClass("exercise_active");
        runRelax();
    });
}
function runRelax() {
    exercise = "relax";
    timer = 15000;
    $(stepId + " .relax").addClass("exercise_active");
    runTimer(function() {
        $(stepId + " .relax").removeClass("exercise_active");
        $(stepId).removeClass("step_active");
        currentStep++;
        changeStep();
        if (currentStep <= 17) runTense();
        else endExercises();
    });
}
function startExercises() {
    if (exercisesStatus === "waiting") {
        exercisesStatus = "started";
        changeStep();
        runTense();
    }
    if (exercisesStatus === "pause") {
        exercisesStatus = "started";
        if (exercise === "tense") runTense();
        else if (exercise === "relax") {
            $(stepId + " .relax").removeClass("exercise_active");
            $(stepId).removeClass("step_active");
            currentStep++;
            changeStep();
            if (currentStep <= 17) runTense();
            else endExercises();
        }
    }
}
function endExercises() {
    $(".button").hide();
    $(".button").removeClass("pause");
    $(".button").text("\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E");
    $(".button").fadeIn();
    exercisesStatus = "waiting";
    currentStep = 1;
    setTimeout(function() {
        document.querySelector("#step1").scrollIntoView();
    }, 500);
}
function programTrigger() {
    if (exercisesStatus === "waiting" || exercisesStatus === "pause") {
        $(".button").hide();
        $(".button").addClass("pause");
        $(".button").text("\u041F\u0430\u0443\u0437\u0430");
        $(".button").fadeIn();
        startExercises();
    } else if (exercisesStatus === "started") {
        $(".button").hide();
        $(".button").removeClass("pause");
        $(".button").text("\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C");
        $(".button").fadeIn();
        exercisesStatus = "pause";
    }
}
$(document).ready(function() {
    $(".button").on("click", function() {
        programTrigger();
    });
});
$(document).ready(function() {
    $(document).keydown(function(event) {
        if (event.which === 32) {
            event.preventDefault();
            programTrigger();
        }
    });
});

//# sourceMappingURL=index.44983732.js.map

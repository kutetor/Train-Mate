window.onload = function() {

    // Find the workout form
    var workoutForm = document.getElementById("workout-form");

    // Listen for form submission
    workoutForm.addEventListener("submit", function(event) {

        // Prevent the form from reloading the page
        event.preventDefault();

        // Get values from the form
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var weight = document.getElementById("weight").value;
        var height = document.getElementById("height").value;
        var goal = document.getElementById("goal").value;
        var experience = document.getElementById("experience").value;
        var duration = document.getElementById("duration").value;

        // Create an empty workout
        var workout = [];

        // Select a base workout based on the training goal
        if (goal === "build-muscle") {

            workout = [
                { name: "Squat" },
                { name: "Chest Press" },
                { name: "Lat Pulldown" },
                { name: "Shoulder Press" }
            ];

        } else if (goal === "lose-fat") {

            workout = [
                { name: "Treadmill" },
                { name: "Exercise Bike" },
                { name: "Elliptical" },
                { name: "Rowing Machine" }
            ];

        }

        // Add an exercise based on experience level
        if (goal === "build-muscle") {

            if (experience === "beginner") {
                workout.push({ name: "Cable Crunch" });

            } else if (experience === "intermediate") {
                workout.push({ name: "Romanian Deadlift" });

            } else if (experience === "advanced") {
                workout.push({ name: "Barbell Deadlift" });
            }

        } else if (goal === "lose-fat") {

            if (experience === "beginner") {
                workout.push({ name: "Walking" });

            } else if (experience === "intermediate") {
                workout.push({ name: "Stair Climber" });

            } else if (experience === "advanced") {
                workout.push({ name: "Running Intervals" });
            }

        }

        // Variables for workout volume
        var sets = 0;
        var reps = 10;
        var cardioMinutes = 0;

        // Set workout volume based on duration
        if (goal === "build-muscle") {

            if (duration === "30") {
                sets = 2;
            } else if (duration === "45") {
                sets = 3;
            } else if (duration === "60") {
                sets = 4;
            }

        } else if (goal === "lose-fat") {

            if (duration === "30") {
                cardioMinutes = 6;
            } else if (duration === "45") {
                cardioMinutes = 9;
            } else if (duration === "60") {
                cardioMinutes = 12;
            }

        }

        // Add workout details to each exercise
        if (goal === "build-muscle") {

            workout.forEach(function(exercise) {
                exercise.sets = sets;
                exercise.reps = reps;
            });

        } else if (goal === "lose-fat") {

            workout.forEach(function(exercise) {
                exercise.minutes = cardioMinutes;
            });

        }

        // Find the workout content area
        var workoutContent = document.getElementById("workout-content");

        // Clear the previous workout
        workoutContent.innerHTML = "";

        // Create readable goal text
        var goalText = "";

        if (goal === "build-muscle") {
            goalText = "Build Muscle";
        } else if (goal === "lose-fat") {
            goalText = "Lose Fat";
        }

        // Create readable experience text
        var experienceText = "";

        if (experience === "beginner") {
            experienceText = "Beginner";
        } else if (experience === "intermediate") {
            experienceText = "Intermediate";
        } else if (experience === "advanced") {
            experienceText = "Advanced";
        }

        // Create the workout title
        var workoutTitle = document.createElement("h3");
        workoutTitle.textContent = name + "'s Workout";
        workoutContent.appendChild(workoutTitle);

        // Create the workout summary
        var workoutSummary = document.createElement("p");
        workoutSummary.textContent =
            goalText + " · " + experienceText + " · " + duration + " minutes";

        workoutContent.appendChild(workoutSummary);

        // Display each exercise
        workout.forEach(function(exercise) {

            // Create an exercise card
            var exerciseCard = document.createElement("article");
            exerciseCard.className = "workout-card";

            // Create the exercise name
            var exerciseName = document.createElement("h4");
            exerciseName.textContent = exercise.name;
            exerciseCard.appendChild(exerciseName);

            // Create exercise details
            var exerciseDetails = document.createElement("p");

            if (goal === "build-muscle") {

                exerciseDetails.textContent =
                    exercise.sets + " sets × " + exercise.reps + " reps";

            } else if (goal === "lose-fat") {

                exerciseDetails.textContent =
                    exercise.minutes + " minutes";

            }

            exerciseCard.appendChild(exerciseDetails);

            // Add the exercise card to the page
            workoutContent.appendChild(exerciseCard);

        });

    });

};
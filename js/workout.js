window.onload = function() {

    // Find the workout form and workout result area
    var workoutForm = document.getElementById("workout-form");
    var workoutContent = document.getElementById("workout-content");

    // Store exercise data from the JSON file
    var exerciseData = [];

    // Load exercise data
    fetch("data/exercises.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(exercises) {
            exerciseData = exercises;
        });

    // Find exercise information by name
    function findExercise(exerciseName) {
        return exerciseData.find(function(exercise) {
            return exercise.name === exerciseName;
        });
    }

    // Listen for form submission
    workoutForm.addEventListener("submit", function(event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Get values used to create the workout
        var name = document.getElementById("name").value;
        var goal = document.getElementById("goal").value;
        var experience = document.getElementById("experience").value;
        var duration = document.getElementById("duration").value;

        // Create an empty workout
        var workout = [];

        // Select exercises based on the training goal
        if (goal === "build-muscle") {
            workout = [
                { name: "Squat" },
                { name: "Chest Press" },
                { name: "Lat Pulldown" },
                { name: "Shoulder Press" }
            ];
        } else {
            workout = [
                { name: "Treadmill" },
                { name: "Exercise Bike" },
                { name: "Elliptical" },
                { name: "Rowing Machine" }
            ];
        }

        // Add one exercise based on experience level
        if (goal === "build-muscle") {
            if (experience === "beginner") {
                workout.push({ name: "Cable Crunch" });
            } else if (experience === "intermediate") {
                workout.push({ name: "Romanian Deadlift" });
            } else {
                workout.push({ name: "Barbell Deadlift" });
            }
        } else {
            if (experience === "beginner") {
                workout.push({ name: "Walking" });
            } else if (experience === "intermediate") {
                workout.push({ name: "Stair Climber" });
            } else {
                workout.push({ name: "Running Intervals" });
            }
        }

        // Set workout volume based on duration
        var sets = 0;
        var reps = 10;
        var cardioMinutes = 0;

        if (goal === "build-muscle") {
            if (duration === "30") {
                sets = 2;
            } else if (duration === "45") {
                sets = 3;
            } else {
                sets = 4;
            }
        } else {
            if (duration === "30") {
                cardioMinutes = 6;
            } else if (duration === "45") {
                cardioMinutes = 9;
            } else {
                cardioMinutes = 12;
            }
        }

        // Create readable text for the workout summary
        var goalText = goal === "build-muscle" ? "Build Muscle" : "Lose Fat";

        var experienceText =
            experience.charAt(0).toUpperCase() + experience.slice(1);

        // Clear the previous workout
        workoutContent.innerHTML = "";

        // Display workout title and summary
        workoutContent.innerHTML = `
            <h3>${name}'s Workout</h3>
            <p>${goalText} · ${experienceText} · ${duration} minutes</p>
        `;

        // Display each exercise
        workout.forEach(function(exercise) {

            // Find the exercise image from JSON
            var exerciseInfo = findExercise(exercise.name);
            var image = "";

            if (exerciseInfo) {
                image = exerciseInfo.image;
            }

            // Create exercise details
            var details = "";

            if (goal === "build-muscle") {
                details = sets + " sets × " + reps + " reps";
            } else {
                details = cardioMinutes + " minutes";
            }

            // Create and display the workout card
            var exerciseCard = document.createElement("article");
            exerciseCard.className = "workout-card";

            exerciseCard.innerHTML = `
                <div class="workout-image-wrapper">
                    <img src="${image}" alt="${exercise.name}" class="workout-image">
                </div>

                <div class="workout-card-content">
                    <h4>${exercise.name}</h4>
                    <p>${details}</p>
                </div>
            `;

            workoutContent.appendChild(exerciseCard);
        });
    });
};
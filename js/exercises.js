window.onload = function() {

    // Display exercise cards on the page
    function displayExercises(exercises) {

        // Find the exercise grid
        var exerciseGrid = document.getElementById("exercise-grid");

        // Clear existing exercise cards
        exerciseGrid.innerHTML = "";

        // Show a message if no exercises match
        if (exercises.length === 0) {
            exerciseGrid.innerHTML = "<p>No exercises found.</p>";
            return;
        }

        // Go through each exercise
        exercises.forEach(function(exercise) {

            // Create an exercise card
            var card = document.createElement("article");
            card.className = "exercise-card";

            // Add exercise information to the card
            card.innerHTML = `
                <h3>${exercise.name}</h3>
                <p class="exercise-meta">
                    ${exercise.type} · ${exercise.level} · ${exercise.muscle}
                </p>
                <p>${exercise.description}</p>
            `;

            // Add the card to the exercise grid
            exerciseGrid.appendChild(card);

        });

    }

    // Load exercise data from the JSON file
    fetch("data/exercises.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(exercises) {

            // Display all exercises when the page loads
            displayExercises(exercises);

            // Find the search and filter elements
            var searchInput = document.getElementById("exercise-search");
            var typeFilter = document.getElementById("type-filter");
            var levelFilter = document.getElementById("level-filter");

            // Filter exercises based on the user's choices
            function filterExercises() {

                // Get values from the search and filters
                var searchText = searchInput.value.toLowerCase();
                var selectedType = typeFilter.value;
                var selectedLevel = levelFilter.value;

                // Find exercises that match all conditions
                var filteredExercises = exercises.filter(function(exercise) {

                    var matchesSearch = exercise.name
                        .toLowerCase()
                        .includes(searchText);

                    var matchesType =
                        selectedType === "all" ||
                        exercise.type === selectedType;

                    var matchesLevel =
                        selectedLevel === "all" ||
                        exercise.level === selectedLevel;

                    return matchesSearch && matchesType && matchesLevel;

                });

                // Display the matching exercises
                displayExercises(filteredExercises);
            }

            // Listen for changes from the user
            searchInput.addEventListener("input", filterExercises);
            typeFilter.addEventListener("change", filterExercises);
            levelFilter.addEventListener("change", filterExercises);

        });

};
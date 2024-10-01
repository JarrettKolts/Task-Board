$(document).ready(function() {
    // Initialize the datepicker for the due date input
    $("#taskDueDate").datepicker();

    // Handle form submission to add a new task
    $("#taskForm").on("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const title = $("#taskTitle").val().trim();
        const dueDate = $("#taskDueDate").val().trim();
        const description = $("#taskDescription").val().trim();

        // Check if the title and due date are provided
        if (title === '' || dueDate === '') {
            alert('Please fill in all required fields.');
            return;
        }

        // Create a new task element
        const taskHtml = `
            <div class="task" draggable="true">
                <h5>${title}</h5>
                <p>Due: ${dueDate}</p>
                <p>${description}</p>
            </div>
        `;

        // Append the new task to the "To Do" column
        $("#todo-cards").append(taskHtml);
        
        // Reset the form fields
        $("#taskForm")[0].reset();

        // Make the new task draggable
        makeTaskDraggable();
    });

    // Function to make tasks draggable
    function makeTaskDraggable() {
        $(".task").draggable({
            revert: "invalid",
            start: function() {
                $(this).css("opacity", "0.5");
            },
            stop: function() {
                $(this).css("opacity", "1");
            }
        });
    }

    // Enable dropping of tasks into lanes
    $(".lane").droppable({
        accept: ".task",
        drop: function(event, ui) {
            $(this).find(".card-body").append(ui.draggable); 
            ui.draggable.css({top: "0px", left: "0px"});
            makeTaskDraggable(); // Ensure draggable is reinitialized after moving
        }
    });

    // Initialize draggable functionality for existing tasks
    makeTaskDraggable();
});
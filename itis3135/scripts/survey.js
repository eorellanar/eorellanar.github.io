function loadImage() {
    var image = document.getElementById("image").files[0];

    const imageUrl = URL.createObjectURL(image);

    var text = "<img src=\"" + imageUrl + "\" >";

    document.getElementById("loadImage").innerHTML = text;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("introForm");

    if (!document.getElementById("agreement").checked) {
        alert("You must agree before submitting.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const mascot = document.getElementById("mascot").value.trim();
    const imageInput = document.getElementById("image");
    const imageCaption = document.getElementById("imageCaption").value.trim();
    const personalBackground = document.getElementById("personalBackground").value.trim();
    const professionalBackground = document.getElementById("professionalBackground").value.trim();
    const academicBackground = document.getElementById("academicBackground").value.trim();
    const webBackground = document.getElementById("webBackground").value.trim();
    const platform = document.getElementById("platform").value.trim();
    const funnyThing = document.getElementById("funnyThing").value.trim();
    const anythingElse = document.getElementById("anythingElse").value.trim();

    const courseInputs = document.querySelectorAll(".course");
    let courses = [];
    courseInputs.forEach(input => {
        if (input.value.trim()) {
            courses.push(input.value.trim());
        }
    });

    const file = imageInput.files[0];
    if (!file || !["image/png", "image/jpeg"].includes(file.type)) {
        alert("Please upload a PNG or JPG image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const resultHTML = `
            <h3>Welcome ${name}!</h3>
            <p><strong>Mascot:</strong> ${mascot}</p>
            <img src="${reader.result}" alt="Uploaded image" style="max-width: 300px;"><br>
            <em>${imageCaption}</em>
            <p><strong>Personal Background:</strong> ${personalBackground}</p>
            <p><strong>Professional Background:</strong> ${professionalBackground}</p>
            <p><strong>Academic Background:</strong> ${academicBackground}</p>
            <p><strong>Web Development Background:</strong> ${webBackground}</p>
            <p><strong>Computer Platform:</strong> ${platform}</p>
            <p><strong>Courses Currently Taking:</strong> <ul>${courses.map(c => `<li>${c}</li>`).join("")}</ul></p>
            <p><strong>Funny Thing:</strong> ${funnyThing}</p>
            <p><strong>Anything Else:</strong> ${anythingElse}</p>
        `;

        document.getElementById("result").innerHTML = resultHTML;
        form.style.display = "none";
        document.getElementById("resetButton").style.display = "inline-block";
        document.getElementById("loadImage").innerHTML = "";

    };
    reader.readAsDataURL(file);
}

function resetForm() {
    document.getElementById("introForm").reset();
    document.getElementById("introForm").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("loadImage").innerHTML = "";

    const courseContainer = document.getElementById("coursesContainer");
    courseContainer.querySelectorAll(".course-group").forEach(group => group.remove());
}

function courseContainerController() {
    const container = document.getElementById("coursesContainer");

    const courseGroup = document.createElement("div");
    courseGroup.className = "course-group";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "course";
    input.placeholder = "Enter a course";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => container.removeChild(courseGroup);

    courseGroup.appendChild(input);
    courseGroup.appendChild(deleteBtn);
    container.appendChild(courseGroup);
}
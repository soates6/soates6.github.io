let courseCount = 0;

function addCourse() {
    courseCount++;
    const container = document.getElementById('coursesContainer');
    const div = document.createElement('div');
    div.className = 'course-entry';
    div.innerHTML = `
        <input type="text" class="course" name="course${courseCount}" placeholder="Course name and description">
        <button type="button" class="delete-course" onclick="deleteCourse(this)">Delete</button>
    `;
    container.appendChild(div);
}

function deleteCourse(button) {
    const container = document.getElementById('coursesContainer');
    if (container.children.length > 1) {
        button.parentElement.remove();
        courseCount--;
    } else {
        alert("You need at least one course entry!");
    }
}

function validateForm() {
    const form = document.getElementById('introForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Check required
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });

    // Check file type if file is uploaded
    const fileInput = document.getElementById('image');
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const validExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
        
        if (!validExtensions.includes(fileExtension)) {
            alert('Please upload a PNG or JPG image file.');
            isValid = false;
        }
    }

    // Check agreement
    if (!document.getElementById('agree').checked) {
        alert('You must agree to the terms before submitting.');
        isValid = false;
    }

    return isValid;
}

function generateIntro() {
    const form = document.getElementById('introForm');
    const output = document.getElementById('introOutput');
    
    // Get form values
    const name = form.name.value;
    const mascot = form.mascot.value;
    const imageCaption = form.imageCaption.value;
    const personalBg = form.personalBg.value;
    const professionalBg = form.professionalBg.value;
    const academicBg = form.academicBg.value;
    const platform = form.platform.value;
    const funny = form.funny.value;
    
    // Get courses
    const courses = [];
    const courseInputs = form.querySelectorAll('.course');
    courseInputs.forEach((input) => {
        if (input.value.trim()) {
            courses.push(input.value.trim());
        }
    });
    
    // Create HTML for the intro page
    let introHTML = `
        <h2>${name} | ${mascot}</h2>
        <figure>
            ${form.image.files.length > 0 ? 
                `<img src="${URL.createObjectURL(form.image.files[0])}" alt="${name}">` : 
                '<p>No image uploaded</p>'}
            <figcaption>${imageCaption}</figcaption>
        </figure>
        <ul>
            <li><b>Personal Background:</b> ${personalBg}</li>
            <li><b>Professional Background:</b> ${professionalBg}</li>
            <li><b>Academic Background:</b> ${academicBg}</li>
            <li><b>Primary Computer Platform:</b> ${platform}</li>
            <li><b>Courses:</b>
                <ul>
                    ${courses.map((course) => `<li>${course}</li>`).join('')}
                </ul>
            </li>
            <li><b>Interesting Item to Remember Me By:</b> ${funny}</li>
        </ul>
    `;
    
    // Display and hide form
    output.innerHTML = introHTML;
    output.style.display = 'block';
    form.style.display = 'none';
    document.getElementById('resetForm').style.display = 'block';
}

function resetForm() {
    const form = document.getElementById('introForm');
    const output = document.getElementById('introOutput');
    
    form.reset();
    output.style.display = 'none';
    form.style.display = 'block';
    document.getElementById('resetForm').style.display = 'none';
    
    // Reset courses 
    const container = document.getElementById('coursesContainer');
    while (container.children.length > 2) {
        container.removeChild(container.lastChild);
    }
    container.children[0].querySelector('.course').value = '';
    courseCount = 1;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize course count based on existing courses
    courseCount = document.querySelectorAll('.course-entry').length;

    // Form submission handler
    document.getElementById('introForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            generateIntro();
        }
    });

    // Add course button handler
    document.getElementById('addCourse').addEventListener('click', addCourse);

    // Reset form link handler
    document.getElementById('resetForm').addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    });
});
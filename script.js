function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.classList.remove("active");
        if (section.id === sectionId) {
            section.classList.add("active");
        }
    });
}

function calculateInternalMarks() {
    const mid1 = parseFloat(document.getElementById("mid1").value) || 0;
    const mid2 = parseFloat(document.getElementById("mid2").value) || 0;
    const quiz1 = parseFloat(document.getElementById("quiz1").value) || 0;
    const quiz2 = parseFloat(document.getElementById("quiz2").value) || 0;
    const ass1 = parseFloat(document.getElementById("ass1").value);
    const ass2 = parseFloat(document.getElementById("ass2").value);
    const attendance = parseInt(document.getElementById("attendance").value) || 0;
    
    const assMax = Math.max(ass1,ass2);
    const assMin = Math.min(ass1,ass2);
    var ass = (assMax/12)*2.8 + (assMin/12)*0.7

    const quizMin = Math.min(quiz1, quiz2);
    const quizMax = Math.max(quiz1, quiz2);
    var quiz = (quizMax/12)*2.8 + (quizMin/12)*0.7

    const maxMid = Math.max(mid1, mid2);
    const minMid = Math.min(mid1, mid2);
    const sessional = (maxMid * 0.8) + (minMid * 0.2);

    let attendanceMarks = 0;
    if (attendance >= 90) attendanceMarks = 5;
    else if (attendance >= 85) attendanceMarks = 4;
    else if (attendance >= 80) attendanceMarks = 3;
    else if (attendance >= 75) attendanceMarks = 2;

    const totalInternal = sessional + quiz + attendanceMarks + ass;
    document.getElementById("internalResult").textContent = `Total Internal Marks: ${totalInternal.toFixed(2)}`;
}

let subjects = [];

function addSubject() {
    const subjectContainer = document.getElementById("subjectContainer");

    const subjectDiv = document.createElement("div");
    subjectDiv.classList.add("subject-entry");
    const gradeSelect = document.createElement("select");
    gradeSelect.innerHTML = `
        <option value="10">A+</option>
        <option value="9">A</option>
        <option value="8">B</option>
        <option value="7">C</option>
        <option value="6">D</option>
        <option value="5">E</option>
        <option value="0">F</option>
    `;
    gradeSelect.classList.add("grade-dropdown");
    
    const creditsInput = document.createElement("input");
    creditsInput.type = "number";
    creditsInput.placeholder = "Credits";
    creditsInput.classList.add("credits-input");

    subjectDiv.appendChild(gradeSelect);
    subjectDiv.appendChild(creditsInput);
    subjectContainer.appendChild(subjectDiv);

    subjects.push({ gradeSelect, creditsInput });
}

function calculateSGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
        const gradePoint = parseFloat(subject.gradeSelect.value);
        const credits = parseFloat(subject.creditsInput.value) || 0;

        totalPoints += gradePoint * credits;
        totalCredits += credits;
    });

    const sgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("sgpaResult").textContent = `SGPA: ${sgpa}`;
}

function calculateCGPA() {
    const currentSGPA = parseFloat(document.getElementById("currentSGPA").value) || 0;
    const previousCGPA = parseFloat(document.getElementById("previousCGPA").value) || 0;

    const cgpa = (currentSGPA + previousCGPA) / 2;
    document.getElementById("cgpaResult").textContent = `CGPA: ${cgpa.toFixed(2)}`;
}

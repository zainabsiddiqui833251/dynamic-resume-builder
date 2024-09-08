"use strict";
// Function to gather form data
function gatherFormData() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    console.log('Gathering form data...'); // Debugging
    const educationEntries = Array.from(document.querySelectorAll('.education-entry'));
    const courseEntries = Array.from(document.querySelectorAll('.course-entry'));
    const experienceEntries = Array.from(document.querySelectorAll('.experience-entry'));
    const skillsNodes = Array.from(document.querySelectorAll('.skill'));
    return {
        name: ((_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value) || '',
        title: ((_b = document.getElementById('title')) === null || _b === void 0 ? void 0 : _b.value) || '',
        profilePic: ((_c = document.getElementById('profile-pic')) === null || _c === void 0 ? void 0 : _c.value) || '',
        about: ((_d = document.getElementById('about')) === null || _d === void 0 ? void 0 : _d.value) || '',
        contact: {
            phone: ((_e = document.getElementById('contact-phone')) === null || _e === void 0 ? void 0 : _e.value) || '',
            github: ((_f = document.getElementById('contact-github')) === null || _f === void 0 ? void 0 : _f.value) || '',
            linkedin: ((_g = document.getElementById('contact-linkedin')) === null || _g === void 0 ? void 0 : _g.value) || '',
            whatsapp: ((_h = document.getElementById('contact-whatsapp')) === null || _h === void 0 ? void 0 : _h.value) || '',
            twitter: ((_j = document.getElementById('contact-twitter')) === null || _j === void 0 ? void 0 : _j.value) || ''
        },
        education: educationEntries.map(entry => {
            var _a, _b, _c;
            return ({
                institute: ((_a = entry.querySelector('.education-institute')) === null || _a === void 0 ? void 0 : _a.value) || '',
                degree: ((_b = entry.querySelector('.education-degree')) === null || _b === void 0 ? void 0 : _b.value) || '',
                duration: ((_c = entry.querySelector('.education-duration')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        }).filter(edu => edu.institute || edu.degree || edu.duration),
        skills: skillsNodes.map(skill => skill.value).filter(value => value.trim() !== ''),
        courses: courseEntries.map(entry => {
            var _a, _b, _c;
            return ({
                institute: ((_a = entry.querySelector('.course-institute')) === null || _a === void 0 ? void 0 : _a.value) || '',
                title: ((_b = entry.querySelector('.course-title')) === null || _b === void 0 ? void 0 : _b.value) || '',
                duration: ((_c = entry.querySelector('.course-duration')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        }).filter(course => course.institute || course.title || course.duration),
        experience: experienceEntries.map(entry => {
            var _a, _b, _c, _d;
            return ({
                companyName: ((_a = entry.querySelector('.experience-company-name')) === null || _a === void 0 ? void 0 : _a.value) || '',
                jobTitle: ((_b = entry.querySelector('.experience-job-title')) === null || _b === void 0 ? void 0 : _b.value) || '',
                yearsWorking: ((_c = entry.querySelector('.experience-years-working')) === null || _c === void 0 ? void 0 : _c.value) || '',
                description: ((_d = entry.querySelector('.experience-description')) === null || _d === void 0 ? void 0 : _d.value) || ''
            });
        }).filter(exp => exp.companyName || exp.jobTitle || exp.yearsWorking || exp.description)
    };
}
// Function to generate the resume HTML
function generateResume(data, resumeContainer) {
    console.log('Generating resume HTML...'); // Debugging
    resumeContainer.innerHTML = `
        <div class="resume-header">
            <img src="${data.profilePic}" alt="Profile Picture">
            <h1>${data.name}</h1>
            <h2>${data.title}</h2>
        </div>
        <section class="about">
            <h3>About Me</h3>
            <p>${data.about}</p>
        </section>
        <section class="contact">
            <h3>Contact</h3>
            <p><i class="fas fa-phone"></i> ${data.contact.phone}</p>
            <p><i class="fab fa-github"></i> <a href="${data.contact.github}" target="_blank">${data.contact.github}</a></p>
            <p><i class="fab fa-linkedin"></i> <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a></p>
            <p><i class="fab fa-whatsapp"></i> <a href="${data.contact.whatsapp}" target="_blank">${data.contact.whatsapp}</a></p>
            <p><i class="fab fa-twitter"></i> <a href="${data.contact.twitter}" target="_blank">${data.contact.twitter}</a></p>
        </section>
        <section class="education">
            <h3>Education</h3>
            ${data.education.length > 0 ? data.education.map((edu) => `
                <p>${edu.institute} - ${edu.degree} (${edu.duration})</p>
            `).join('') : '<p>No education details provided.</p>'}
        </section>
        <section class="skills">
            <h3>Skills</h3>
            ${data.skills.length > 0 ? `<ul>${data.skills.map((skill) => `<li>${skill}</li>`).join('')}</ul>` : '<p>No skills provided.</p>'}
        </section>
        <section class="courses">
            <h3>Courses</h3>
            ${data.courses.length > 0 ? data.courses.map((course) => `
                <p>${course.institute} - ${course.title} (${course.duration})</p>
            `).join('') : '<p>No courses provided.</p>'}
        </section>
        <section class="experience">
            <h3>Experience</h3>
            ${data.experience.length > 0 ? data.experience.map((exp) => `
                <p>${exp.companyName} - ${exp.jobTitle} (${exp.yearsWorking})</p>
                <p>${exp.description}</p>
            `).join('') : '<p>No experience details provided.</p>'}
        </section>
    `;
}
// Function to enable editing of resume content
function enableResumeEditing(resumeContainer) {
    resumeContainer.contentEditable = 'true';
}
// Function to enable dark mode toggle
function enableDarkModeToggle() {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const resumeContainer = document.getElementById('resume');
    const downloadButton = document.getElementById('download-resume');
    const resumeUrl = document.getElementById('resume-url');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const resumeData = gatherFormData();
        console.log('Resume Data:', resumeData); // Debugging
        generateResume(resumeData, resumeContainer);
        // Generate URL and enable download
        const resumeBlob = new Blob([resumeContainer.innerHTML], { type: 'text/html' });
        const resumeUrlString = URL.createObjectURL(resumeBlob);
        if (downloadButton) {
            downloadButton.href = resumeUrlString;
            downloadButton.download = 'resume.html';
        }
        if (resumeUrl) {
            resumeUrl.value = resumeUrlString;
        }
    });
    enableResumeEditing(resumeContainer);
    enableDarkModeToggle();
});

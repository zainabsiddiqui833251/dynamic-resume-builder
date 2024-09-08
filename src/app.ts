interface Education {
    institute: string;
    degree: string;
    duration: string;
}

interface Course {
    institute: string;
    title: string;
    duration: string;
}

interface Experience {
    companyName: string;
    jobTitle: string;
    yearsWorking: string;
    description: string;
}

interface Data {
    name: string;
    title: string;
    profilePic: string;
    about: string;
    contact: {
        phone: string;
        github: string;
        linkedin: string;
        whatsapp: string;
        twitter: string;
    };
    education: Education[];
    skills: string[];
    courses: Course[];
    experience: Experience[];
}

// Function to gather form data
function gatherFormData(): Data {
    console.log('Gathering form data...'); // Debugging

    const educationEntries = Array.from(document.querySelectorAll('.education-entry'));
    const courseEntries = Array.from(document.querySelectorAll('.course-entry'));
    const experienceEntries = Array.from(document.querySelectorAll('.experience-entry'));
    const skillsNodes = Array.from(document.querySelectorAll('.skill')) as HTMLInputElement[];

    return {
        name: (document.getElementById('name') as HTMLInputElement)?.value || '',
        title: (document.getElementById('title') as HTMLInputElement)?.value || '',
        profilePic: (document.getElementById('profile-pic') as HTMLInputElement)?.value || '',
        about: (document.getElementById('about') as HTMLTextAreaElement)?.value || '',
        contact: {
            phone: (document.getElementById('contact-phone') as HTMLInputElement)?.value || '',
            github: (document.getElementById('contact-github') as HTMLInputElement)?.value || '',
            linkedin: (document.getElementById('contact-linkedin') as HTMLInputElement)?.value || '',
            whatsapp: (document.getElementById('contact-whatsapp') as HTMLInputElement)?.value || '',
            twitter: (document.getElementById('contact-twitter') as HTMLInputElement)?.value || ''
        },
        education: educationEntries.map(entry => ({
            institute: (entry.querySelector('.education-institute') as HTMLInputElement)?.value || '',
            degree: (entry.querySelector('.education-degree') as HTMLInputElement)?.value || '',
            duration: (entry.querySelector('.education-duration') as HTMLInputElement)?.value || ''
        })).filter(edu => edu.institute || edu.degree || edu.duration),
        skills: skillsNodes.map(skill => skill.value).filter(value => value.trim() !== ''),
        courses: courseEntries.map(entry => ({
            institute: (entry.querySelector('.course-institute') as HTMLInputElement)?.value || '',
            title: (entry.querySelector('.course-title') as HTMLInputElement)?.value || '',
            duration: (entry.querySelector('.course-duration') as HTMLInputElement)?.value || ''
        })).filter(course => course.institute || course.title || course.duration),
        experience: experienceEntries.map(entry => ({
            companyName: (entry.querySelector('.experience-company-name') as HTMLInputElement)?.value || '',
            jobTitle: (entry.querySelector('.experience-job-title') as HTMLInputElement)?.value || '',
            yearsWorking: (entry.querySelector('.experience-years-working') as HTMLInputElement)?.value || '',
            description: (entry.querySelector('.experience-description') as HTMLInputElement)?.value || ''
        })).filter(exp => exp.companyName || exp.jobTitle || exp.yearsWorking || exp.description)
    };
}

// Function to generate the resume HTML
function generateResume(data: Data, resumeContainer: HTMLDivElement) {
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
            ${data.education.length > 0 ? data.education.map((edu: Education) => `
                <p>${edu.institute} - ${edu.degree} (${edu.duration})</p>
            `).join('') : '<p>No education details provided.</p>'}
        </section>
        <section class="skills">
            <h3>Skills</h3>
            ${data.skills.length > 0 ? `<ul>${data.skills.map((skill: string) => `<li>${skill}</li>`).join('')}</ul>` : '<p>No skills provided.</p>'}
        </section>
        <section class="courses">
            <h3>Courses</h3>
            ${data.courses.length > 0 ? data.courses.map((course: Course) => `
                <p>${course.institute} - ${course.title} (${course.duration})</p>
            `).join('') : '<p>No courses provided.</p>'}
        </section>
        <section class="experience">
            <h3>Experience</h3>
            ${data.experience.length > 0 ? data.experience.map((exp: Experience) => `
                <p>${exp.companyName} - ${exp.jobTitle} (${exp.yearsWorking})</p>
                <p>${exp.description}</p>
            `).join('') : '<p>No experience details provided.</p>'}
        </section>
    `;
}

// Function to enable editing of resume content
function enableResumeEditing(resumeContainer: HTMLDivElement) {
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
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeContainer = document.getElementById('resume') as HTMLDivElement;
    const downloadButton = document.getElementById('download-resume') as HTMLAnchorElement;
    const resumeUrl = document.getElementById('resume-url') as HTMLTextAreaElement;

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

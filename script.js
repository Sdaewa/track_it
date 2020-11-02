const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const applicationForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const date = document.getElementById('date-picker');
const applicationsContainer = document.getElementById('applications-container');

let applications = [];

function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
    date.focus();
}

function validateForm(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Something is missing');
        return false;
    }
    if (urlValue.match(regex)) {

    };
    if (!urlValue.match(regex)) {
        alert('Enter Valid URL please');
        return false;
    };
    return true;
}

function buildApplications() {
    applicationsContainer.textContent = '';
    applications.forEach((application) => {
        const {
            name,
            url,
            date
        } = application;
        const item = document.createElement('div');
        item.classList.add('item');

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'deleteApplication');
        closeIcon.setAttribute('onclick', `deleteApplication('${url}')`);

        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // linkInfo.classList.add('date');

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');

        const link = document.createElement('a');
        const linkDate = document.createElement('p');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        linkDate.textContent = date;
        linkInfo.append(favicon, link, linkDate);
        item.append(closeIcon, linkInfo);
        applicationsContainer.appendChild(item);
    });
}

function fetchApplications() {
    if (localStorage.getItem('applications')) {
        applications = JSON.parse(localStorage.getItem('applications'));

        // else {
        //     applications = [{
        //         name: 'Github',
        //         url: 'https://github.com'
        //     }];
    };
    localStorage.setItem('applications', JSON.stringify(applications));
    buildApplications();
}

function deleteApplication(url) {
    applications.forEach((application, i) => {
        if (application.url === url) {
            applications.splice(i, 1);
        }
    });

    localStorage.setItem('applications', JSON.stringify(applications));
    fetchApplications();
}

function storeApplication(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    const dateValue = date.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    };
    if (!validateForm(nameValue, urlValue)) {
        return false;
    }
    const application = {
        name: nameValue,
        url: urlValue,
        date: dateValue
    };
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
    fetchApplications();
    applicationForm.reset();
    websiteNameEl.focus();
}


modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal')
});
window.addEventListener('click', (e) => {
    (e.target === modal) ? modal.classList.remove('show-modal'): false;
});
applicationForm.addEventListener('submit', storeApplication);


fetchApplications();
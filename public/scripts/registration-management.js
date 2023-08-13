const updateRegistrationFormElements = document.querySelectorAll(
  '.registration-actions form'
);

async function updateRegistration(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const newStatus = formData.get('status');
  const registrationId = formData.get('registrationid');
  const csrfToken = formData.get('_csrf');

  let response;

  try {
    response = await fetch(`/admin/registrations/${registrationId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong - could not update registration status.');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not update registration status.');
    return;
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateRegistrationFormElement of updateRegistrationFormElements) {
  updateRegistrationFormElement.addEventListener('submit', updateRegistration);
}

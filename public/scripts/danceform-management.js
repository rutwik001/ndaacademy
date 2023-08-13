const deleteDanceformButtonElements = document.querySelectorAll('.danceform-item button');

async function deleteDanceform(event) {
  const buttonElement = event.target;
  const danceformId = buttonElement.dataset.danceformid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch('/admin/danceforms/' + danceformId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteDanceformButtonElement of deleteDanceformButtonElements) {
  deleteDanceformButtonElement.addEventListener('click', deleteDanceform);
}
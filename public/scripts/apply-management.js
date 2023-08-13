const addToApplyButtonElement = document.querySelector('#danceform-details button');
const applyBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToApply() {
  const danceformId = addToApplyButtonElement.dataset.danceformid;
  const csrfToken = addToApplyButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch('/apply/items', {
      method: 'POST',
      body: JSON.stringify({
        danceformId: danceformId,
        _csrf: csrfToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
  } catch (error) {
    alert('Something went wrong!');
    return;
  }
  
  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  for (const applyBadgeElement of applyBadgeElements) {
    applyBadgeElement.textContent = newTotalQuantity;
  }
}

addToApplyButtonElement.addEventListener('click', addToApply);
const applyItemUpdateFormElements = document.querySelectorAll(
  '.apply-item-management'
);
const applyTotalFeeElement = document.getElementById('apply-total-fee');
const applyBadgeElements = document.querySelectorAll('.nav-items .badge');

async function updateApplyItem(event) {
  event.preventDefault();

  const form = event.target;

  const danceformId = form.dataset.danceformid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch('/apply/items', {
      method: 'PATCH',
      body: JSON.stringify({
        danceformId: danceformId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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

  if (responseData.updatedApplyData.updatedItemFee === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const applyItemTotalFeeElement =
      form.parentElement.querySelector('.apply-item-fee');
    applyItemTotalFeeElement.textContent =
      responseData.updatedApplyData.updatedItemFee.toFixed(2);
  }

  applyTotalFeeElement.textContent =
    responseData.updatedApplyData.newTotalFee.toFixed(2);

  for (const applyBadgeElement of applyBadgeElements) {
    applyBadgeElement.textContent =
      responseData.updatedApplyData.newTotalQuantity;
  }
}

for (const formElement of applyItemUpdateFormElements) {
  formElement.addEventListener('submit', updateApplyItem);
}

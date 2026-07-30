const showModal = document.getElementById('account-nav-mobile');
const addAccButton = document.getElementById('add-account');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('add-acc-btn');

showModal.addEventListener('click', () => {
    modal.style.display = 'flex'
    console.log('modal is visible')
});

addAccButton.addEventListener('click', () => {
    modal.style.display = 'flex'
    console.log('model Shown')
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none'
    console.log('modal is invisible')
});



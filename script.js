document.getElementById('showMoreBtn').addEventListener('click', function () {
  const info = document.getElementById('extraInfo');
  if (info.classList.contains('hidden')) {
    info.classList.remove('hidden');
    this.textContent = 'Visa mindre';
  } else {
    info.classList.add('hidden');
    this.textContent = 'Visa mer';
  }
});

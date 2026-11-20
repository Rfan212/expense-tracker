// MENAMPUNG DATA
const productPrices = JSON.parse(localStorage.getItem('daftarHarga')) || [];

// MEMANIPULASI HTML
function renderProduct() {
  const container = document.getElementById('projectList');

  let projectsHTML = '';

  for (let i = 0; i < productPrices.length; i++) {
    const product = productPrices[i];

    projectsHTML += `
    <li class="list-group-item border rounded p-5 d-flex justify-content-between align-items-center">
        <h5>${product.name}</h5>
        <p class="fg-danger fw-bold">Rp ${Number(product.price).toLocaleString('id-ID')}</p>
    </li>`;
  }

  container.innerHTML = projectsHTML;

  // TOTAL HARGA
  const total = productPrices.reduce(function (sumProduct, product) {
    return sumProduct + Number(product.price);
  }, 0);

  document.getElementById('totalPrice').textContent = `
  Rp ${total.toLocaleString('id-ID')}`;
}

renderProduct();

// FORM SUBMIT
const field = document.getElementById('projectForm');

field.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('projectName').value.trim();
  const price = document.getElementById('projectPrice').value.trim();

  if (name === '' || price === '') {
    field.reset();
    alert('Harap isi nama dan nominal pengeluaran!');
    return;
  } else if (isNaN(price)) {
    field.reset();
    alert('Nominal / harga harap isi dengan angka!');
    return;
  }

  const newProject = {
    id: productPrices.length + 1,
    name: name,
    price: price,
  };

  productPrices.push(newProject);
  localStorage.setItem('daftarHarga', JSON.stringify(productPrices));

  renderProduct();
  field.reset();
});

// DELETE BUTTON
const deleteBtn = document.getElementById('deleteButton');
deleteBtn.addEventListener('click', function () {
  localStorage.removeItem('daftarHarga');

  productPrices.length = 0;

  renderProduct();
});

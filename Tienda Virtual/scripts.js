document.addEventListener('DOMContentLoaded', () => {
    const carritoLink = document.getElementById('carrito-link');
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    const cart = [];

    // Mostrar/ocultar carrito
    carritoLink.addEventListener('click', (e) => {
        e.preventDefault();
        carritoContenedor.classList.toggle('mostrar');
    });

    // Manejar clic en botón "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.previousElementSibling.textContent.replace('Precio: L', '').replace(',', ''));
            const productImage = document.querySelector(`#product${productId} img`).src;

            addToCart(productId, productName, productPrice, productImage);
        });
    });

    function addToCart(productId, productName, productPrice, productImage) {
        // Comprobar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            existingItem.quantity++;
        } else {
            // Si es un nuevo producto, agregarlo al carrito
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            });
        }

        updateCart();
    }

    function updateCart() {
        // Limpiar los elementos actuales del carrito
        cartItemsElement.innerHTML = '';
        totalPrice = 0;

        cart.forEach(item => {
            const cartItemContainer = document.createElement('div');
            cartItemContainer.classList.add('cart-item-container');

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const productImage = document.createElement('img');
            productImage.src = item.image;
            productImage.classList.add('product-image');
            productImage.alt = item.name;

            const itemDetails = document.createElement('div');

            const itemName = document.createElement('h4');
            itemName.textContent = `${item.name} x${item.quantity}`;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Precio: L${(item.price * item.quantity).toFixed(2)}`;

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);

            cartItem.appendChild(productImage);
            cartItem.appendChild(itemDetails);
            cartItemContainer.appendChild(cartItem);

            cartItemsElement.appendChild(cartItemContainer);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: L${totalPrice.toFixed(2)}`;
    }
});

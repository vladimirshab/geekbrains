var prodOfBasket = [];
prodOfBasket[0] = {
			name: 'Product0',
			quantity: 2,
			price: 10
		};
prodOfBasket[1] = {
			name: 'Product1',
			quantity: 5,
			price: 20
		};		
prodOfBasket[2] = {
			name: 'Product2',
			quantity: 4,
			price: 25
		};		
var sumPrice = 0;
function countBasketPrice () {
	for (var i = 0; i < prodOfBasket.length ; i++) {
	sumPrice = sumPrice + prodOfBasket[i].quantity * prodOfBasket[i].price;
		}
		console.log ( sumPrice );
	}
countBasketPrice();




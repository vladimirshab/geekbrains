var d = document,
    itemBox = d.querySelectorAll('.item_box'), 
		cartCont = d.getElementById('cart_content'),
		nextMode = 1; 

function addEvent(elem, type, handler){
  if(elem.addEventListener){elem.addEventListener(type, handler, false);} 
  else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {}, 
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'), 
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML; 
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][2] += 1;
	} else { 
		cartData[itemId] = [itemTitle, itemPrice, 1];
	}
	
	if(!setCartData(cartData)){ 
		this.disabled = false; 
		cartCont.innerHTML = 'Добавлено в корзину.';
		setTimeout(function(){
			cartCont.innerHTML = 'Купить еще';
		}, 1000);
	}
	return false;
}

function delFromCart(e){
	//this.disabled = true; 
	var cartData = getCartData() || {}, 
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'), 
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML; 
	if(cartData[itemId][2] > 0){ 
		cartData[itemId][2] -= 1;
	} else { 
		//cartData[itemId] = [itemTitle, itemPrice, 1];
		//JSON.parse(localStorage.removeItem('cart'));
		//cartData[itemId].splice;
	}
	
	if(!setCartData(cartData)){ 
		this.disabled = false; 
		cartCont.innerHTML = 'Удалено из корзины.';
		setTimeout(function(){
			cartCont.innerHTML = 'Купить еще';
		}, 1000);
	}
	return false;
}

for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
	addEvent(itemBox[i].querySelector('.del_item'), 'click', delFromCart);
}

function openCart(e){
	
	var cartData = getCartData(), 
			totalItems = '',
			totalSum = 0;
	console.log(JSON.stringify(cartData));
	
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Название</th><th>Цена</th><th>Количество</th><th>Сумма</th></tr>';
		for(var items in cartData){
			if(cartData[items][2]>0){
				totalItems += '<tr>';
				for(var i = 0; i < cartData[items].length; i++){
					totalItems += '<td>' + cartData[items][i] + '</td>';
				}
				totalItems += '<td>' + cartData[items][1]*cartData[items][2] + '</td>';
				totalItems += '</tr>';
				totalSum += cartData[items][1]*cartData[items][2];
			}
		}
		totalItems += '<td>' + 'Итого:' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' +  totalSum + '</td>';
		totalItems += '<table>';
		//totalItems += '<p><button id="next">Далее</button></p>';
		if(totalSum > 0){
			cartCont.innerHTML = totalItems;	
		} else {
			JSON.parse(localStorage.removeItem('cart'));
			cartCont.innerHTML = 'Корзина пустая';		
		}	
	} else {
		
		cartCont.innerHTML = 'Корзина пустая';
	}
	nextMode = 2;
	return false;
}

function nextBlock(e){
	//this.disabled = true; 

	switch (nextMode) {
  case 2:
	cartCont.innerHTML = 'Адрес доставки: '+ '<input type="text" name="txt_field"  size="100">';
    nextMode = 3;
	break;
  case 3:
	cartCont.innerHTML = 'Комментарий: '+ '<input type="text" name="txt_field"  size="100">';
    nextMode = 4;
	break;
  case 4:
    openCart();
	nextMode = 2;
    break;
}
}	

addEvent(d.getElementById('checkout'), 'click', openCart);
addEvent(d.getElementById('next'), 'click', nextBlock);
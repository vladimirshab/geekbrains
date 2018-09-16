var num = prompt('Введите число');
function createObject(num) {
	if (num>999) {
		console.log ('Число не должно быть больше 999');
		var numObj={};
		}
	else{
		var numObj={
			hundreds: (num-num%100)/100,
			tens: (num%100-num%10)/10,
			ones: num%10
		};
		console.log ('Единицы '+numObj.ones+' десятки '+numObj.tens+' сотни '+numObj.hundreds);
		}
	return numObj;
}
createObject(num);
var prost = [ 2 ],
    chislo = 2;
while ( chislo <= 100) {
    var chislo_ver = 1;
    for ( var i = 0; i < prost.length; i++) {
        if ( chislo % prost[ i ] === 0) {
            chislo_ver = 0;
        }
    }
    if ( chislo_ver === 1 ) {
        prost.push( chislo );
    }
    chislo++;
}
console.log ( prost );
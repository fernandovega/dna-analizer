/* 
    * Analizer.js 
    * 
    * Algoritmos para analizar secuencia de DNA y revisar mutación en las distintas formas. 
    * La mutación consiste en encontrar repeticiones de cuatro letras consecutivas en lineas
    * verticales, horizontales y diagonales de la matriz de entrada. 
    * 
    * Las matrices de entrada deben de ser cuadradas y superiores a 4x4.
*/

exports.toBiArray = (dna) => {
    return dna.map(item => item.split(''))
};

/* 
    * validate
    *
    * Se valida si es una matrix cuadrada y tiene un tamaño superior de 4
    * Se validan caracteres permitidos: ATCG
    * 
    * Se implementa un reductor para repasar todo el arreglo y si se encuentra una anomalia
    * se incremente el acumulador que se inicializa en 0, quiere decir que si hay errores en la secuencia de DNA
    * el valor de retorno sera superior a 0
*/
exports.validate = (arr) => {
    let status = arr.reduce((acc, row, i, array) => {
        if(row.length != array.length) {
            acc++;
        }
        
        if(array.length < 4) {
            acc++;
        }
        
        let regex = new RegExp(/[^ATCG]*$/gm);
        if(/[^ATCG]/.test(row))
            acc++

        return acc
    }, 0) 

    return status
} 

/* 
    * checkMutation
    *
    * Metodo principal para identificar si hay una mutacion en la matriz DNA de entrada.
    * Se invoca el metodo counterChar para cada uno de los distintas lineas de la matriz de entrada. 
    *  
*/
exports.checkForMutation = (arr) => {
    
    if(counterChar(arr) > 0) {
        console.log('Mutation found in Horizontal array')
        return true
    }
    
    if(counterChar(getVerticalArrays(arr)) > 0) {
        console.log('Mutation found in Vertical array');
        return true
    }
        
    if(counterChar(getRDiagonalArrays(arr)) > 0) {
        console.log('Mutation found in Right Diagonal array');
        return true
    }

    if(counterChar(getLDiagonalArrays(arr)) > 0) {
        console.log('Mutation found in Left Diagonal array');
        return true
    }

    console.log('Mutation not found');
    return false
}

// Auxiliar para obtener el numero de diagonales izquierda o derecha de una matrix, 
// Util para trabajar con matrices cuadradas de distintos tamaños
const getDiagNumByArray = (arr) => {
    return  ((arr.length * 4) - 2) / 2;
}

// Funcion para encontrar el numero de repeticiones consecitivas de una letra en una matriz
const counterChar = (arr)  => {        
    return arr.reduce((status, row, y) => {
        
        let counter = {
            char: '',
            count: 0
        };
        let repetitions = row.reduce((preview, current) => {
            if (preview === current) {
                counter.count++;
                counter.char = current;
            }
            else{
                if(counter.count < 4) {
                    counter.count = 1;
                    counter.char = current;
                }  
            }
            
            return current;
        }, '')

        
        if(counter.count >= 4) {
            console.log('Array:', row, 'Position: ' + y);
            status++
        }
        
        return status;
    }, 0);
}

// Se obtiene una arreglo bidimencional con las lineas diagoles por la izquierdas de la matriz de entrada
const getLDiagonalArrays = (arr) => {
    return arr.reduce((acc, row, y, array) => {
        const len = row.length

        for (var i = 0; i < getDiagNumByArray(array); i++) {
            let position = i - y
            
            if(position >= 0){
                const rightDiag = row[position]
                if(rightDiag)
                    acc[i].push(rightDiag)
            }
            
        }
    
        return acc
    
    }, new Array(getDiagNumByArray(arr)).fill(null).map(x => [])) 
}

// Se obtiene una arreglo bidimencional con las lineas diagoles por la derecha de la matriz de entrada
const getRDiagonalArrays = (arr) => {
    return arr.reduce((acc, row, y, array) => {
        const len = row.length
        
        for (var i = 0; i < getDiagNumByArray(array); i++) {
            let position = len - i - 1
            
            if(position >= 0){
                const rightDiag = row[position]
                if(rightDiag)
                    acc[i + y].push(rightDiag)
            }
            
        }
    
        return acc
    
    }, new Array(getDiagNumByArray(arr)).fill(null).map(x => [])) 
}

// Se obtiene un arreglo bidimencional de las lineas verticales de la matriz de entrada
const getVerticalArrays = (arr) => {
    return arr.reduce((acc, row, y, array) => {
        const len = row.length
        
        for (var i = 0; i < len; i++) {
            const rightDiag = row[i]
            acc[i].push(rightDiag)
        }
    
        return acc
    
    }, new Array(arr.length).fill(null).map(x => [])) 
}


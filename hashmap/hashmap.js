 class HashMap {
    constructor(loadfactor, capacity) {
        this.loadfactor = loadfactor;
        this.capacity = capacity;
        this.buckets = [];
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.capacity;
        }
     
        return hashCode;
    }

    set(key,value) {
        let index = this.hash(key);

        // console.log(`${index}`);

        
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        // console.log(index);
        if(typeof this.buckets[index] !== "object") {
            // console.log(`I have activated for ${key}`);
            this.count++;
        }
        
        this.buckets[index] = {key, value};
        this.checkLoadFactor();
    }

    get(key) {
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        return (this.buckets[index] !== null ? this.buckets[index] : null);
    }

    remove(key) {
        let index = this.hash(key);
        if(typeof this.buckets[index] !== "number") {
            return false;
        } else {
            this.buckets[index] = null;
            this.count--;
            return true;
        }

        
    }



    clear() {
        this.buckets = [];
        this.count = 0;
    }

    values() {
        let result = [];

        for(let i = 0;i<this.buckets.length;i++) {
            // result.push(this.buckets[i]);
            if(this.buckets[i] !== undefined) {
                result.push(this.buckets[i].value);
            }
        }

        return result;
    }

    enteries() {
        for(let i = 0;i<this.buckets.length;i++) {
            // result.push(this.buckets[i]);
            if(this.buckets[i] !== undefined) {
                console.log(this.buckets[i]);
            }
        }
    }

    length() {
        return this.count;
    }

    getLoadFactor () {
        return this.count / this.capacity;
    }
    
    checkLoadFactor() {
        let currentLoad = this.getLoadFactor();
        if(currentLoad >= this.loadfactor) {
            this.capacity *= 2;
            console.log(this.capacity);
        }   
    }
}

const test = new HashMap(0.75,16) // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('fly', 'black')
test.set('fsdfsdfly', 'black')
test.set('werd', 'black')
test.set('eroi','black')
// test.set('lion', 'black')
test.set('moon', 'silver')

// console.log(test.values());
test.enteries();
// console.log(test.length());
// console.log(test.getLoadFactor());
 


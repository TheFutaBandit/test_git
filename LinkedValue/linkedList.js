let Node = (v = null, l = null) => {
    let value = v;
    let nextNode = l;
    return {
        value,
        nextNode
    }
}


let LinkedList = (defaultValue) => {
    let header = Node(defaultValue);
    let footer = header;

    function append(value) {
        footer.nextNode = Node(value);
        footer = footer.nextNode;
    }

    function prepend(value) {
        let temp = Node(value,header);
        header = temp;
    }

    function size() {
        
        let count = 0;
        let temp = header;

        while(temp !== null) {
            count++;
            temp = temp.nextNode;
        }

        return count;
    }

    function tail() {
        return footer;
    }

    function at(index) {
        let count = 0;
        let temp = header;
        while(temp.nextNode !== null && count != index) {
            count++;
        }
        return temp;
    }

    function contains(value) {
        let temp = header;
        while(temp !== null) {
            if(temp.value == value) {
                return true;
            }
            temp = temp.nextNode;
        }
        return false;
    }

    function find(value) {
        let temp = header;
        let count = 0;
        while(temp !== null) {
            if(temp.value == value) {
                return count;
            }
            temp = temp.nextNode;
            count++;
        }
        return -1;
    }

    function toString() {
        let temp = header;
        let str = "";
        while(temp !== null) {
            str += (`( ${temp.value} ) -> `);
            temp = temp.nextNode;
        }
        str += "null";
        return str;
    }

    function insertAt(value, index) {
        let count = 0;
        let temp = header;
        let prev = null;

        while(count != index) {
            prev = temp;
            temp = temp.nextNode;
            count++;
        }

        let tempNode = Node(value,temp);
        prev.nextNode = tempNode;
    }

    function removeAt(index) {
        let count = 0;
        let temp = header;
        let prev = null;

        while(count != index) {
            prev = temp;
            temp = temp.nextNode;
            count++;
        }

        prev.nextNode = temp.nextNode;
        temp.nextNode = null;

        delete temp;
    }

    return {
        append,
        prepend,
        size,
        tail,
        at,
        contains,
        find,
        toString,
        insertAt,
        removeAt
    }
};

let ll = LinkedList(5);
ll.append(3);
ll.append(6);
ll.append(8);
ll.prepend(7);
ll.insertAt(56,3);

console.log(ll.toString());

ll.removeAt(3);

console.log(ll.toString());

let list = LinkedList("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

// console.log(list.toString());


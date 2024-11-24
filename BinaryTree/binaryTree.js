let Node = (v = null, l = null, r = null) => {
    let data = v;
    let left = l;
    let right = r;

    return {
        data,
        left,
        right
    }
}


let Tree = (array) => {
    array.sort((a,b) =>  (a-b));
    array = [...new Set(array)];

    function buildTree(array,left,right) {
        if(left <= right) {
            let mid = Math.trunc(left + (right-left)/2);
            
            let nd = Node(array[mid]);

            nd.left = buildTree(array,left,mid-1);

            nd.right = buildTree(array,mid+1,right);

            return nd;
        }
        return null;
    }

    let root = buildTree(array,0,array.length-1);

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    function insert(value) {
        let temp = root;
        let prev = null;

        while(temp !== null) {
            if(temp.data > value) {
                prev = temp;
                temp = temp.left;
            } else {
                prev = temp;
                temp = temp.right;
            }
        }

        if(prev.data > value) {
            prev.left = Node(value);
        } else {
            prev.right = Node(value);
        }
    }

    function find(value, node = root) {
        if(node === null) {
            return undefined;
        }

        if(node.data === value) {
            return node;
        }

        if(value > node.data) {
            return find(value, node.right);
        } else {
            return find(value, node.left);
        }
    }

    function deleteItem(value) {
        let temp = root;
        let prev = null;

        while(temp !== null && temp.data !== value) {
            prev = temp;
            if(temp.data > value) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
        }

        if(temp === null) {
            console.log(-1);
            return;
        }

        //two child removal
        if(temp.left !== null && temp.right !== null) {
            let tempNode = temp.right;
            let parent = temp;
            
            while(tempNode.left !== null) {
                parent = tempNode;
                tempNode = tempNode.left;
            }

            temp.data = tempNode.data;

            if(parent.left === tempNode) {
                parent.left = tempNode.right;
            } else {
                parent.right = tempNode.right;
            }
        } else {
            const child = ((temp.left !== null) ? temp.left : temp.right);
            if(prev === null) {
                root = child;
            } else if(prev.right === temp) {
                prev.right = child;
            } else {
                prev.left = child;
            }
        }

        
    }

    function levelorder(callback = null) {
        if(callback === null) {
            throw new Error("bro?");
        }

        let queue = [];
        let source = root;
        queue.push(source);

        while(queue.length !== 0) {
            let node = queue.shift();
            
            callback(node);

            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
        }
    }

    function preOrder(callback = null, node = root) {
        if(node === null) {
            return;
        }

        if(callback === null) {
            throw new Error("bro?");
        }

        callback(node);

        preOrder(callback, node.left);
        preOrder(callback, node.right);
    }

    function inOrder(callback = null, node = root) {
        if(node === null) {
            return;
        }
        if(callback === null) {
            throw new Error("bro?");
        }
        inOrder(callback, node.left);
        callback(node);
        inOrder(callback, node.right);
    }

    function postOrder(callback = null, node = root) {
        if(node === null) {
            return;
        }
        if(callback === null) {
            throw new Error("bro?");
        }
        postOrder(callback, node.left);
        postOrder(callback, node.right);
        callback(node);
    }

    function height(node = root) {
        //height = max(leftheight, rightheight)
        if(node === null) {
            return 0;
        }

        let lh = height(node.left);
        let rh = height(node.right);

        return Math.max(lh,rh)+1;
    }

    function isBalanced(node = root) {
        //height = max(leftheight, rightheight)
        if(node === null) {
            return 0;
        }

        let lh = height(node.left);
        let rh = height(node.right);

        if(lh === -1 || rh === -1) return -1;
        if(Math.abs(lh-rh) > 1) return -1;

        return Math.max(lh,rh)+1;
    }

    function depth(target, node = root) {
        if(node === null || target === null) {
            return -Infinity;
        }

        if(node.data === target.data) {
            return 0;
        }

        if(target.data > node.data) {
            return (1 + depth(target, node.right));
        } else {
            return (1 + depth(target, node.left));
        }
    }

    function rebalance() {
        let reorder_array = [];

        this.inOrder((node) => {
            reorder_array.push(node.data)
        })
        console.log(reorder_array);
        // reorder_array.push(0);

        root =  buildTree(reorder_array, 0, reorder_array.length-1);

        console.log(root);


        // this.prettyPrint(k);

        // console.log(root);
        
        // this.preOrder((node) => {
        //     console.log(node.data);
        // })

        

    }

    return {
        root,
        prettyPrint,
        find,
        levelorder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        insert,
        deleteItem,
        isBalanced,
        rebalance
    }
}



let array = [...Array(100)].map(() => {
    return Math.floor(Math.random()*100);
})

console.log(array);

console.log("*********************************************************************************")

let binary_tree = Tree(array);

binary_tree.prettyPrint(binary_tree.root);

console.log("*********************************************************************************")

console.log(binary_tree.isBalanced());

console.log("*********************************************************************************")

let nums = [...Array(10)].map(() => {
    return (100 + Math.floor(Math.random()*100));
})

nums.map((item) => {
    binary_tree.insert(item);
})

console.log(binary_tree.isBalanced());

console.log("*********************************************************************************")

binary_tree.rebalance();
console.log(binary_tree.isBalanced());

console.log("*********************************************************************************")

let level_order = [];
let pre_order = [];
let in_order = [];

binary_tree.levelorder((node) => {
    level_order.push(node.data);
})

binary_tree.preOrder((node) => {
    pre_order.push(node.data);
})

binary_tree.inOrder((node) => {
    in_order.push(node.data);
})

console.log(level_order);
console.log(pre_order);
console.log(in_order);




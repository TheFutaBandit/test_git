let nums = [4,2,34,23,89,89,45];

function merge(left,mid,right) {
    let i = left;
    let j = mid + 1;
    let k = 0;

    let result = [];

    while(i <= mid && j <= right) {
        if(nums[i] <= nums[j]) {
            result[k] = nums[i];
            k++;
            i++;
        } else {
            result[k] = nums[j];
            k++;
            j++;
        }
    }

    while(i <= mid) {
        result[k] = nums[i];
        k++;
        i++;
    }

    while(j <= right) {
        result[k] = nums[j];
        k++;
        j++;
    }

    for(let t = left; t <= right; t++) {
        nums[t] = result[t-left];
    }

}

function mergeSort(left, right) {
    if(left < right) {
        console.log(left);
        console.log(right);
        //console.log("hi");
        let mid = Math.trunc(left + (right-left)/2);
        mergeSort(left,mid);
        mergeSort(mid+1,right);
        merge(left,mid,right);
    }
}

let left = 0;
let right = nums.length-1;

mergeSort(left,right);

console.log(nums);
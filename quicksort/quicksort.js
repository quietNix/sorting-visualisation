let canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let beats = Math.floor((canvas.width / 10) - 1);
let data = new Array(beats).fill().map(i => (Math.random() * 99) + 1);

let w = 10;
let states = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 2;
    let width = 8;

    data.map((height, i) => {
        ctx.beginPath();
        if (states[i] === 0) ctx.fillStyle = "green";
        else if (states[i] === 1) ctx.fillStyle = "red";
        else ctx.fillStyle = "blue";
        ctx.rect(width, canvas.height - 5, 8, -(height * canvas.height / 100) + 5);
        width += 10;
        ctx.fill();
        ctx.stroke();
    });
}

quickSort(data, 0, data.length - 1);


async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }
    return pivotIndex;
}

async function swap(arr, a, b) {
    await sleep(120);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    draw()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
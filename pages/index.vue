<script setup>
const container = ref(null);
const spacing = ref(50);
const lineCount = ref(2);

const createLine = (x, y, className) => {
  const line = document.createElement("div");
  line.className = className;
  line.style.left = `${x}px`;
  line.style.top = `${y}px`;
  return line;
};

onMounted(() => {
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;

  const xAxisCenter = containerHeight / 2;
  const yAxisCenter = containerWidth / 2;

  console.log(containerWidth, containerHeight);

  console.log(xAxisCenter, yAxisCenter);

  const originXAxis = createLine(0, xAxisCenter, "line-x main-line");
  const originYAxis = createLine(yAxisCenter, 0, "line-y main-line");

  container.value.appendChild(originXAxis);
  container.value.appendChild(originYAxis);

  let count = lineCount.value;
  for (let i = xAxisCenter; i > 0; i -= spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(0, i, "line-x " + lineType);
    if (lineType === "count-line") {
      const text = document.createElement("span");
      text.innerText = (count - lineCount.value) / 2;
      text.style.position = "absolute";
      text.style.left = xAxisCenter + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = xAxisCenter; i < containerHeight; i += spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(0, i, "line-x " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = "- " + (count - lineCount.value) / 2;
      text.style.position = "absolute";
      text.style.left = xAxisCenter - 10 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = yAxisCenter; i > 0; i -= spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(i, 0, "line-y " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = "- " + (count - lineCount.value) / 2;
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";
      text.style.top = yAxisCenter - 10 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = yAxisCenter; i < containerWidth; i += spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(i, 0, "line-y " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = (count - lineCount.value) / 2;
      text.style.position = "absolute";
      text.style.top = yAxisCenter - 10 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }
});
</script>

<template>
  <div ref="container" id="container"></div>
</template>

<style>
#container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.line-x {
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
}
.line-y {
  position: absolute;
  height: 100%;
  transform: translateX(-50%);
}

.main-line {
  background-color: #000000;
}

.count-line {
  background-color: #cccccc;
}

.filler-line {
  background-color: #e5e5e5;
}

.line-x.main-line {
  height: 2px;
}

.line-y.main-line {
  width: 2px;
}

.line-x.count-line,
.line-x.filler-line {
  height: 1px;
}

.line-y.count-line,
.line-y.filler-line {
  width: 1px;
}
</style>

<script setup>
const container = ref(null);
const spacing = ref(50);
const lineCount = ref(2);

const onZoom = (action) => {
  if (action === "in") {
    if (lineCount.value === 1) {
      return;
    }
    lineCount.value -= 1;
  } else if (action === "out") {
    if (lineCount.value === 4) {
      return;
    }
    lineCount.value += 1;
  }
};

watch(
  () => lineCount.value,
  () => {
    // Clear the container before creating the graph again
    container.value.innerHTML = "";
    // Create the graph again with the new line count
    init();
  }
);

const createGraph = () => {
  const createLine = (x, y, className) => {
    const line = document.createElement("div");
    line.className = className;
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    return line;
  };
  // -----------------------
  // Creating the main lines
  // -----------------------
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;

  const xAxisCenter = containerWidth / 2;
  const yAxisCenter = containerHeight / 2;

  const originXAxis = createLine(0, yAxisCenter, "line-x main-line");
  const originYAxis = createLine(xAxisCenter, 0, "line-y main-line");

  container.value.appendChild(originXAxis);
  container.value.appendChild(originYAxis);

  // -----------------------------------------
  // Creating the secondary lines with spacing
  // -----------------------------------------
  let count = lineCount.value;
  for (let i = yAxisCenter; i > 0; i -= spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(0, i, "line-x " + lineType);
    if (lineType === "count-line") {
      const text = document.createElement("span");

      text.innerText = (count - lineCount.value) / lineCount.value;
      text.style.position = "absolute";
      text.style.left = container.value.clientWidth / 2 - 15 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = yAxisCenter; i < containerHeight; i += spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(0, i, "line-x " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = "- " + (count - lineCount.value) / lineCount.value;
      text.style.position = "absolute";
      text.style.left = container.value.clientWidth / 2 - 25 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = xAxisCenter; i > 0; i -= spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(i, 0, "line-y " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = "- " + (count - lineCount.value) / lineCount.value;
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";
      text.style.top = container.value.clientHeight / 2 + 5 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }

  count = lineCount.value;
  for (let i = xAxisCenter; i < containerWidth; i += spacing.value) {
    const lineType =
      count % lineCount.value === 0 ? "count-line" : "filler-line";
    const line = createLine(i, 0, "line-y " + lineType);
    if (lineType === "count-line" && (count - lineCount.value) / 2 !== 0) {
      const text = document.createElement("span");
      text.innerText = (count - lineCount.value) / lineCount.value;
      text.style.position = "absolute";
      text.style.top = container.value.clientHeight / 2 + 5 + "px";
      line.appendChild(text);
    }
    container.value.appendChild(line);
    count++;
  }
};

const drawPoint = (x, y) => {
  const point = document.createElement("div");
  const left =
    x * (lineCount.value * spacing.value) + container.value.clientWidth / 2 - 5;
  const top =
    y * (lineCount.value * spacing.value * -1) +
    container.value.clientHeight / 2 -
    5;

  point.className = "point";
  point.style.left = `${left}px`;
  point.style.top = `${top}px`;
  container.value.appendChild(point);
};

const drawVector = (x1, y1, x2, y2) => {
  const vector = document.createElement("div");
  const initialPointPosition = {
    x: x1 * (lineCount.value * spacing.value) + container.value.clientWidth / 2,
    y:
      y1 * (lineCount.value * spacing.value * -1) +
      container.value.clientHeight / 2,
  };
  const terminalPointPosition = {
    x: x2 * (lineCount.value * spacing.value) + container.value.clientWidth / 2,
    y:
      y2 * (lineCount.value * spacing.value * -1) +
      container.value.clientHeight / 2,
  };

  // Vector legth is also called magnitude
  const vectorLength = Math.sqrt(
    Math.pow(terminalPointPosition.x - initialPointPosition.x, 2) +
      Math.pow(terminalPointPosition.y - initialPointPosition.y, 2)
  );

  const angle = Math.atan2(
    terminalPointPosition.y - initialPointPosition.y,
    terminalPointPosition.x - initialPointPosition.x
  );

  vector.className = "vector";
  vector.style.left = `${initialPointPosition.x}px`;
  vector.style.top = `${initialPointPosition.y}px`;
  vector.style.width = `${vectorLength}px`;
  vector.style.transform = `rotate(${angle}rad)`;
  vector.style.transformOrigin = "0 0";
  vector.style.backgroundColor = "#0000ff";
  vector.style.height = "2px";
  vector.style.borderRadius = "50%";

  container.value.appendChild(vector);
};

const init = () => {
  createGraph();

  // // Draw points
  drawPoint(1, 1);
  drawPoint(-1, 1);
  drawPoint(3, 3);
  drawPoint(-5, -2);

  // // Draw vectors
  drawVector(1, 1, 3, 3);
  drawVector(-1, 1, -5, -2);
};

onMounted(() => {
  init();
});
</script>

<template>
  <div ref="container" id="container"></div>

  <div class="zoom-buttons">
    <UButtonGroup size="xl" color="neutral" variant="outline">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-twemoji:plus"
        @click="onZoom('out')"
      />
      <UButton
        color="neutral"
        variant="outline"
        icon="i-twemoji:minus"
        @click="onZoom('in')"
      />
    </UButtonGroup>
  </div>
</template>

<style>
#container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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

.line-y span,
.line-x span {
  font-size: 13px;
  color: #000000;
}

.point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ff0000;
  border-radius: 50%;
}

.vector {
  position: absolute;
  background-color: #0000ff;
  height: 2px;
  border-radius: 50%;
  transform-origin: left center;
}

.zoom-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

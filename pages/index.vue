<script setup>
const container = ref(null);
const spacing = ref(50);

const createLine = (x, y, className, main = false) => {
  const line = document.createElement("div");
  line.className = className;
  line.style.left = `${x}px`;
  line.style.top = `${y}px`;
  line.style.backgroundColor = main ? "#000000" : "#cccccc";
  return line;
};

onMounted(() => {
  const containerWidth = container.value.clientWidth;
  const containerHeight = container.value.clientHeight;

  const xAxisCenter = containerHeight / 2;
  const yAxisCenter = containerWidth / 2;

  const originXAxis = createLine(0, xAxisCenter, "line-x", true);
  const originYAxis = createLine(yAxisCenter, 0, "line-y", true);

  container.value.appendChild(originXAxis);
  container.value.appendChild(originYAxis);

  for (let i = xAxisCenter; i > 0; i -= spacing.value) {
    const line = createLine(0, i, "line-x");
    container.value.appendChild(line);
  }

  for (let i = xAxisCenter; i < containerHeight; i += spacing.value) {
    const line = createLine(0, i, "line-x");
    container.value.appendChild(line);
  }

  for (let i = yAxisCenter; i > 0; i -= spacing.value) {
    const line = createLine(i, 0, "line-y");
    container.value.appendChild(line);
  }

  for (let i = yAxisCenter; i < containerWidth; i += spacing.value) {
    const line = createLine(i, 0, "line-y");
    container.value.appendChild(line);
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
  height: 1px;
  transform: translateY(-50%);
}
.line-y {
  position: absolute;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
}
</style>

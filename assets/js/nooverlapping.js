function setHeaderHeight() {
  const header = document.getElementById("header");
  document.documentElement.style.setProperty(
    "--header-height",
    header.offsetHeight + "px"
  );
}

window.addEventListener("load", setHeaderHeight);
window.addEventListener("resize", setHeaderHeight);
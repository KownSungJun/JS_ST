//Promise 기반 유틸 함수 모음
export function waitForClick(element) {
  return new Promise((resolve) => {
    function handler(e) {
      element.removeEventListener("click", handler);
      resolve(e.target.dataset.btn);
    }
    element.addEventListener("click", handler);
  });
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

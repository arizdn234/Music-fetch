const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function detil() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const closeModalBtn = document.querySelector(".btn-close");
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

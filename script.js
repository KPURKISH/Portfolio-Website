const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".gallery-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.filter;

    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

// const form = document.querySelector("#booking-form");
// const message = document.querySelector(".form-message");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const name = new FormData(form).get("name");

//   message.textContent = `Thank you, ${name}. Your enquiry has been received — I’ll be in touch soon.`;

//   message.classList.add("success");
//   form.reset();
// });

// const form = document.querySelector("#booking-form");
// const message = document.querySelector(".form-message");
// const submitButton = form.querySelector('button[type="submit"]');

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   submitButton.disabled = true;
//   submitButton.textContent = "Sending...";
//   message.textContent = "";

//   try {
//     const response = await fetch(form.action, {
//       method: "POST",
//       body: new FormData(form),
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (response.ok) {
//       const name = new FormData(form).get("name");

//       message.textContent = `Thank you, ${name}. Your enquiry has been sent successfully. I’ll be in touch soon.`;

//       message.classList.add("success");
//       form.reset();
//     } else {
//       throw new Error("Form submission failed");
//     }
//   } catch (error) {
//     message.textContent =
//       "Sorry, your enquiry could not be sent. Please try again or email us directly.";

//     message.classList.remove("success");
//   }

//   submitButton.disabled = false;
//   submitButton.innerHTML = "Send enquiry <span>↗</span>";
// });

const form = document.querySelector("#booking-form");
const message = document.querySelector(".form-message");
const submitButton = form.querySelector('button[type="submit"]');

const successModal = document.querySelector("#success-modal");
const successName = document.querySelector("#success-name");
const closeModalButton = document.querySelector("#modal-close");
const modalButton = document.querySelector("#modal-button");

function closeSuccessModal() {
  successModal.classList.remove("show");
  successModal.setAttribute("aria-hidden", "true");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  message.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    successName.textContent = name;
    form.reset();

    successModal.classList.add("show");
    successModal.setAttribute("aria-hidden", "false");
  } catch (error) {
    message.textContent =
      "Sorry, your enquiry could not be sent. Please try again or email us directly.";
  }

  submitButton.disabled = false;
  submitButton.innerHTML = "Send enquiry <span>↗</span>";
});

closeModalButton.addEventListener("click", closeSuccessModal);
modalButton.addEventListener("click", closeSuccessModal);

successModal.addEventListener("click", (event) => {
  if (event.target === successModal) {
    closeSuccessModal();
  }
});

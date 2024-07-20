const form = document.querySelector('.feedback-form');

//Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
const STORAGE_KEY = "feedback-form-state";

// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
let formData = {
    email: "",
    message: ""
};

populateForm();

// Відстеження подій на формі
form.addEventListener("submit", handleFormSubmit);
form.addEventListener("input", handleFormInput);


// Функція для обробки введення даних у форму
function handleFormInput(event) {
    const value = event.target.value.trim();
    const key = event.target.name.trim();

    formData[key] = value;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    
    console.log(key, value);
}




function populateForm() {
  let savedFeedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  // якщо в ЛС не існує таке значення, то виходимо з фукнції
  if (!savedFeedbackData) {
    return;
  }

  for (const key in savedFeedbackData) {
      form.elements[key].value = savedFeedbackData[key];
      formData[key] = savedFeedbackData[key];
  }
}


// При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». 
// Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.


function handleFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = { email: "", message: "" };
  }
}
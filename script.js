document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    addButton.addEventListener("click", function () {
        const taskText = inputField.value.trim();
        if (taskText === "") return; // 빈 값 방지

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${taskText}
            <button class="delete-btn">삭제</button>
        `;
        todoList.appendChild(listItem);

        // 삭제 기능 추가
        listItem.querySelector(".delete-btn").addEventListener("click", function () {
            listItem.remove();
        });

        inputField.value = ""; // 입력 필드 초기화
    });
});

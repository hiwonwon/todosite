document.addEventListener("DOMContentLoaded", () => {
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const body = document.body;
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const aiList = document.getElementById("ai-list");

    // AI 추천 목록 (고정 데이터로 예시)
    const aiRecommendations = [
        "운동하기",
        "책 읽기",
        "정리정돈",
        "아침 일찍 일어나기",
        "새로운 취미 시작하기"
    ];

    // 추천 항목을 표시하는 함수
    function showAIRecommendations(query) {
        aiList.innerHTML = "";  // 기존 추천 항목 삭제

        // 간단한 추천 알고리즘: 사용자가 입력한 내용에 따라 추천 항목 필터링
        aiRecommendations.forEach(item => {
            if (item.toLowerCase().includes(query.toLowerCase())) {
                const li = document.createElement("li");
                li.textContent = item;
                aiList.appendChild(li);

                // 추천 항목 클릭 시 해당 항목을 입력창에 채워주기
                li.addEventListener('click', () => {
                    todoInput.value = item;
                    aiList.innerHTML = ""; // 추천 목록을 비워줌
                });
            }
        });
    }

    // 다크 모드 상태 확인
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️ 라이트 모드";
    }

    // 다크 모드 버튼 클릭 시 토글
    darkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeBtn.textContent = "☀️ 라이트 모드";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeBtn.textContent = "🌙 다크 모드";
        }
    });

    // 할 일 추가 버튼 클릭 시
    addBtn.addEventListener("click", () => {
        const todoText = todoInput.value;
        if (todoText.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = todoText;
            todoList.appendChild(li);
            todoInput.value = "";

            // 할 일 추가 후 추천 항목을 업데이트
            showAIRecommendations(todoText);
        }
    });

    // 할 일 입력 시 AI 추천 항목 실시간 업데이트
    todoInput.addEventListener("input", () => {
        showAIRecommendations(todoInput.value);
    });
});

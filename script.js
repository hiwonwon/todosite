document.addEventListener("DOMContentLoaded", () => {
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const body = document.body;
    const todoInput = document.getElementById("todo-input");
    const rewardInput = document.getElementById("reward-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const aiList = document.getElementById("ai-list");
    const introText = document.getElementById("intro-text");

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
        const rewardText = rewardInput.value;

        if (todoText.trim() !== "") {
            const li = document.createElement("li");
            const todoItem = document.createElement("span");
            todoItem.textContent = todoText;
            const rewardItem = document.createElement("span");
            rewardItem.textContent = ` | 보상: ${rewardText}`;
            
            // 삭제 버튼 추가
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "삭제";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                li.remove();  // 할 일 삭제
            });
            li.appendChild(todoItem);
            li.appendChild(rewardItem);

            todoList.appendChild(li);
            todoInput.value = "";
            rewardInput.value = ""; 
            li.appendChild(deleteBtn);
            ;

            // 할 일 추가 후 추천 항목을 업데이트
            showAIRecommendations(todoText);
        }
    });

    // 할 일 입력 시 AI 추천 항목 실시간 업데이트
    todoInput.addEventListener("input", () => {
        showAIRecommendations(todoInput.value);
    });

    // 텍스트 애니메이션
    const text = "To-Do List";
    let i = 0;

    // Initially hide the text and show only the cursor
    introText.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            introText.innerHTML = text.substring(0, i + 1); // Add one character at a time
            i++;
            setTimeout(typeWriter, 150); // Adjust typing speed here
        }
    }

    typeWriter();
});

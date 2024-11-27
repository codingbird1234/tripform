// "모두 동의합니다" 체크박스 로직
const agreeAll = document.getElementById("agreeAll");
const individualCheckboxes = [
  document.getElementById("is14OrOlder"),
  document.getElementById("agreePrivacy"),
];

// "모두 동의합니다" 클릭 시, 개별 체크박스 상태 동기화
agreeAll.addEventListener("change", (e) => {
  individualCheckboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
});

// 개별 체크박스 클릭 시, "모두 동의합니다" 상태 업데이트
individualCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    agreeAll.checked = individualCheckboxes.every((cb) => cb.checked);
  });
});

// 폼 제출 로직
document.getElementById("companyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 필수 동의 체크 여부 확인
  if (
    !document.getElementById("is14OrOlder").checked &&
    !document.getElementById("agreePrivacy").checked
  ) {
    alert(
      "만 14세 이상임을 체크해주세요.\n[필수] 모두 동의합니다를 체크해주세요."
    );
    return;
  } else if (!document.getElementById("agreePrivacy").checked) {
    alert("[필수] 개인정보 수집 및 이용 동의를 체크해주세요.");
    return;
  } else if (!document.getElementById("is14OrOlder").checked) {
    alert("만 14세 이상임을 체크해주세요.");
    return;
  }

  // FormData 생성 및 서버 전송
  const formData = new FormData(e.target);

  // 추가 데이터 설정
  formData.set(
    "is14OrOlder",
    document.getElementById("is14OrOlder").checked ? "true" : "false"
  );
  formData.set(
    "agreePrivacy",
    document.getElementById("agreePrivacy").checked ? "true" : "false"
  );

  // Apps Script URL 설정
  const scriptURL = "Apps Script URL";

  try {
    fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    alert("제출이 완료되었습니다.");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("제출 과정 중 오류가 발생하였습니다.");
  }
});

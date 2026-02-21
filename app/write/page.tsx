"use client";

import { useState } from "react";
import Link from "next/link";

export default function WritePage() {
  const [letter, setLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nickname = localStorage.getItem("nickname");
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: letter, nickname }),
      });

      if (res.ok) {
        alert("편지가 성공적으로 제출되었습니다!");
        setLetter("");
      } else {
        const data = await res.json();
        alert("오류: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("편지 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6">
          <Link
            href="/"
            className="font-medium text-amber-600 hover:text-amber-700"
          >
            ← 돌아가기
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-amber-900">
            이번 주 수요일의 편지
          </h1>
          <p className="text-gray-600">
            솔직한 마음을 담아주세요. 누군가가 당신의 이야기를 읽어줄 거예요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              오늘은 어떤 수요일이었나요?
            </label>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="당신의 수요일 이야기를 들려주세요..."
              className="h-96 w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-amber-500"
              required
            />
            <p className="mt-2 text-sm text-gray-500">{letter.length}자</p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>안내사항</strong>
              <br />• 개인정보(이름, 연락처 등)는 작성하지 말아주세요
              <br />• 공격적이거나 혐오적인 내용은 검토 과정에서 거절될 수
              있어요
              <br />• 작성하신 편지는 운영자 검토 후 다른 분께 전달됩니다
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:bg-gray-300"
              disabled={letter.length === 0 || isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "편지 보내기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

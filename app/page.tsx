"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname }),
    });

    if (res.ok) {
      localStorage.setItem("nickname", nickname);
      router.push("/write");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-amber-900">
            수요일의 편지
          </h1>
          <p className="text-gray-600">
            매주 수요일, 당신의 이야기를 나눠주세요
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 p-6">
            <h2 className="mb-3 text-xl font-semibold text-amber-900">
              오늘은 수요일입니다
            </h2>
            <p className="mb-4 text-gray-700">
              뭔가 좋은 일이 있었나요? 아니면 힘든 일이 있었나요?
              <br />
              당신의 수요일 이야기를 써서 보내면,
              <br />
              세상 어딘가의 누군가가 당신의 이야기를 읽어줄 거예요.
            </p>
          </div>

          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full rounded-lg border border-amber-200 p-3 focus:border-amber-500 focus:outline-none"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              편지 쓰기
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {"나의 수요일을 읽어 주실 당신, 처음 뵙겠습니다."}
        </div>
      </div>
    </div>
  );
}

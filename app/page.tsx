import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            수요일의 편지
          </h1>
          <p className="text-gray-600">
            매주 수요일, 당신의 이야기를 나눠주세요
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-amber-900 mb-3">
              오늘은 수요일입니다
            </h2>
            <p className="text-gray-700 mb-4">
              뭔가 좋은 일이 있었나요? 아니면 힘든 일이 있었나요?
              <br />
              당신의 수요일 이야기를 써서 보내면,
              <br />
              세상 어딘가의 누군가가 당신의 이야기를 읽어줄 거예요.
            </p>
          </div>

          <div className="text-center">
            <Link href="/write">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                편지 쓰기
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          "나의 수요일을 읽어 주실 당신, 처음 뵙겠습니다."
        </div>
      </div>
    </div>
  );
}
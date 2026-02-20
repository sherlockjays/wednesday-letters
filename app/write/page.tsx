'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function WritePage() {
    const [letter, setLetter] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('letters')
                .insert([
                    {
                        content: letter,
                        email: email,
                        status: 'PENDING'
                    }
                ])
                .select();

            if (error) {
                console.error('Error:', error);
                alert('편지 제출 중 오류가 발생했습니다: ' + error.message);
            } else {
                alert('편지가 성공적으로 제출되었습니다! 검토 후 전달될 예정입니다.');
                setLetter('');
                setEmail('');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('편지 제출 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                        ← 돌아가기
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900 mb-2">
                        이번 주 수요일의 편지
                    </h1>
                    <p className="text-gray-600">
                        솔직한 마음을 담아주세요. 누군가가 당신의 이야기를 읽어줄 거예요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            이메일 (편지 도착 알림용)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            오늘은 어떤 수요일이었나요?
                        </label>
                        <textarea
                            value={letter}
                            onChange={(e) => setLetter(e.target.value)}
                            placeholder="당신의 수요일 이야기를 들려주세요..."
                            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            {letter.length}자
                        </p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            💡 <strong>안내사항</strong>
                            <br />
                            • 개인정보(이름, 연락처 등)는 작성하지 말아주세요
                            <br />
                            • 공격적이거나 혐오적인 내용은 검토 과정에서 거절될 수 있어요
                            <br />
                            • 작성하신 편지는 운영자 검토 후 다른 분께 전달됩니다
                        </p>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-300"
                            disabled={letter.length === 0 || isSubmitting}
                        >
                            {isSubmitting ? '제출 중...' : '편지 보내기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
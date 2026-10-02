import React from 'react';
import NewsSection from '../../features/news/components/NewsSection';

export default function NewsPage() {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>
          실시간 펫 헬스 케어 뉴스
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', marginTop: '6px' }}>
          수의학 건강 상식, 사료 리콜 정보, 안구/피부 케어 가이드
        </p>
      </div>
      <NewsSection />
    </div>
  );
}

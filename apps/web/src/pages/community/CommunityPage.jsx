import React from 'react';
import CommunitySection from '../../features/community/components/CommunitySection';

export default function CommunityPage({ user, onOpenLogin, onOpenDetail }) {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>
          반려인 커뮤니티 & 리포트 공유
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', marginTop: '6px' }}>
          AI 진단 리포트를 첨부하고 다른 반려인들과 경험을 나누어 보세요.
        </p>
      </div>
      <CommunitySection
        user={user}
        onOpenLogin={onOpenLogin}
        onOpenDetail={onOpenDetail}
      />
    </div>
  );
}

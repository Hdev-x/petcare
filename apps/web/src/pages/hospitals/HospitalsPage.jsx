import React from 'react';
import HospitalLocator from '../../features/hospitals/components/HospitalLocator';

export default function HospitalsPage({ user, onOpenLogin }) {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>
          24시 응급 동물병원 찾기
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', marginTop: '6px' }}>
          네이버 지역검색으로 확인된 병원만 표시합니다. 이동 전 병원에 전화해 진료 가능 여부를 확인하세요.
        </p>
      </div>
      <HospitalLocator
        user={user}
        onOpenLogin={onOpenLogin}
      />
    </div>
  );
}

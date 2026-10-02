import React from 'react';
import TimelineSlider from '../../features/timeline/components/TimelineSlider';

export default function TimelinePage({ selectedPet, sourceDiagnosis, onNavigateDiagnosis }) {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>
          Before / After 경과 관찰 타임라인
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', marginTop: '6px' }}>
          저장된 실제 진단 두 건이 준비되면 같은 환부의 변화를 비교할 수 있습니다.
        </p>
      </div>
      <TimelineSlider
        selectedPet={selectedPet}
        sourceDiagnosis={sourceDiagnosis}
        onNavigateDiagnosis={onNavigateDiagnosis}
      />
    </div>
  );
}

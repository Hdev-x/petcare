import React from 'react';
import DiagnosisDropzone from '../../features/diagnosis/components/DiagnosisStudio';
import CareFlowBranch from '../../features/diagnosis/components/CareFlowBranch';

export default function DiagnosisPage({ selectedPet, pets, isAuthenticated, onSelectPet, onOpenLogin, onOpenPetManagement,
  onNavigateTimeline, onOpenCareFlow, onDiagnosisResult, diagnosisResult, lookupRequestId }) {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#047857', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '9999px' }}>
          Core Feature
        </span>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginTop: '10px' }}>
          AI 반려동물 질병 진단 스튜디오
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', marginTop: '6px' }}>
          환부 Image 소견과 입력 기반 Safety Triage 결과를 구분해 안내합니다.
        </p>
      </div>
      <DiagnosisDropzone
        key={selectedPet?.id || 'no-pet'}
        selectedPet={selectedPet}
        pets={pets}
        isAuthenticated={isAuthenticated}
        onSelectPet={onSelectPet}
        onOpenLogin={onOpenLogin}
        onOpenPetManagement={onOpenPetManagement}
        onNavigateTimeline={onNavigateTimeline}
        onOpenCareFlow={onOpenCareFlow}
        onDiagnosisResult={onDiagnosisResult}
      />
      <div style={{ marginTop: '40px' }}>
        <CareFlowBranch
          diagnosisResult={diagnosisResult}
          onNavigateTimeline={onNavigateTimeline}
          lookupRequestId={lookupRequestId}
        />
      </div>
    </div>
  );
}

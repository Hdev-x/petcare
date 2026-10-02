export function DiagnosisSummaryCard({ onNavigateDiagnosis, recentDiagnosis }) {
  return (
    <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(226, 232, 240, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🩺</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#0b0f19', margin: 0 }}>
                    최근 AI 질병 진단 소견
                  </h4>
                </div>
                <span
                  onClick={onNavigateDiagnosis}
                  style={{ fontSize: '11.5px', color: '#059669', fontWeight: '800', cursor: 'pointer' }}
                >
                  스튜디오 ➔
                </span>
              </div>

              {recentDiagnosis ? (
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{recentDiagnosis.date || '최근 진단'}</span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: recentDiagnosis.danger === 'HIGH' ? '#fee2e2' : '#ecfdf5',
                      color: recentDiagnosis.danger === 'HIGH' ? '#dc2626' : '#059669'
                    }}>
                      {recentDiagnosis.danger === 'HIGH' ? '🚨 정밀 검진 권장' : '✅ 양호'}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', marginBottom: '6px' }}>
                    {recentDiagnosis.diseaseName || '피부 이상 소견 분석'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                    {recentDiagnosis.opinion || '환부 사진 기반 AI 분석 결과입니다.'}
                  </div>
                </div>
              ) : (
                <div style={{ background: '#fafbfc', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '20px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>
                    최근 AI 진단 기록 없음
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                    환부 사진을 업로드하여 실시간 질환 확률을 분석해 보세요
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateDiagnosis}
                    className="card-hover-lift"
                    style={{
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '11.5px',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    사진 업로드 분석 ➔
                  </button>
                </div>
              )}
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '12px', textAlign: 'center' }}>
              Vision AI 멀티모달 진단
            </div>
          </div>
  );
}

export function DailyCareSummaryCard({ currentPet, setActiveSubTab }) {
  return (
    <div className="card-hover-lift" style={{
            background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.7) 0%, rgba(240, 253, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            border: '1.5px solid #a7f3d0',
            boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(167, 243, 208, 0.6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🤖</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#065f46', margin: 0 }}>
                    일상 맞춤 AI 어시스턴트
                  </h4>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', background: '#ede9fe', color: '#7c3aed', padding: '2px 8px', borderRadius: '9999px' }}>
                  Gemini AI 탑재
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#6b21a8', lineHeight: '1.55', margin: '0 0 16px 0', fontWeight: '500' }}>
                {currentPet?.name || '반려동물'}의 품종과 나이에 맞는 일일 권장 식사량(Kcal) 계산, 이상 행동 분석, 관절/영양제 상담을 실시간으로 시작해 보세요.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('daily-ai')}
                className="card-hover-lift"
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '14px',
                  background: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>💬</span>
                <span>AI와 일상 케어 상담하기 ➔</span>
              </button>
            </div>

          </div>
  );
}

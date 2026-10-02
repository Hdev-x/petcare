export default function VitalProfileCard({ profile }) {
  const {
    isSaved,
    handleSaveVitals,
    vitals,
    currentTemp,
    handleVitalChange,
    currentWeight
  } = profile;
  return (
    <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '26px',
            padding: '28px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 30px -8px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(226, 232, 240, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                    border: '1.5px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    🩺
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                      기초 바이탈 & 건강 프로필
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                      실시간 정상 지표 비교 및 맞춤 관리
                    </span>
                  </div>
                </div>

                {isSaved && (
                  <span style={{ fontSize: '11.5px', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '3px 10px', borderRadius: '9999px', fontWeight: '800' }}>
                    ✓ 저장 완료
                  </span>
                )}
              </div>

              <form id="vital-profile-form" onSubmit={handleSaveVitals} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 3 Core Vital Smart Tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {/* Tile 1: 체온 */}
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                      <span>체온</span>
                      <span>🌡️</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="number"
                        step="0.1"
                        name="bodyTemp"
                        value={vitals.bodyTemp || currentTemp}
                        onChange={handleVitalChange}
                        placeholder="38.5"
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '18px', fontWeight: '900', color: '#0b0f19', outline: 'none', padding: 0 }}
                      />
                      <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>°C</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>
                      변화 곡선 반영 (정상 37.5~39.0)
                    </div>
                  </div>

                  {/* Tile 2: 심박수 */}
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                      <span>심박수</span>
                      <span>💓</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="number"
                        name="heartRate"
                        value={vitals.heartRate}
                        onChange={handleVitalChange}
                        placeholder="95"
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '18px', fontWeight: '900', color: '#0b0f19', outline: 'none', padding: 0 }}
                      />
                      <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '700' }}>bpm</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', marginTop: '4px' }}>
                      안정 70~140
                    </div>
                  </div>

                  {/* Tile 3: 몸무게 */}
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                      <span>몸무게</span>
                      <span>⚖️</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={vitals.weight || currentWeight}
                        onChange={handleVitalChange}
                        placeholder="2.0"
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '18px', fontWeight: '900', color: '#059669', outline: 'none', padding: 0 }}
                      />
                      <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>kg</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#047857', fontWeight: '700', marginTop: '4px' }}>
                      변화 곡선 반영
                    </div>
                  </div>
                </div>

                {/* Health Specifics Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🌾 알레르기 유발 성분
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={vitals.allergies}
                      onChange={handleVitalChange}
                      placeholder="예: 닭고기, 특정 곡물, 유제품 알레르기 등"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12.5px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      ⚠️ 기저 질환 & 주의 병력
                    </label>
                    <input
                      type="text"
                      name="conditions"
                      value={vitals.conditions}
                      onChange={handleVitalChange}
                      placeholder="예: 슬개골 탈구, 피부염 재발 이력, 백내장 등"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12.5px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      💊 현재 복용 약물 / 처방식
                    </label>
                    <input
                      type="text"
                      name="medications"
                      value={vitals.medications}
                      onChange={handleVitalChange}
                      placeholder="예: 관절 영양제, 심장약, 유리너리 처방식 등"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12.5px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <button
              form="vital-profile-form"
              type="submit"
              className="card-hover-lift"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '14px',
                fontSize: '13.5px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                marginTop: '16px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>💾</span>
              <span>바이탈 & 프로필 저장하기</span>
            </button>
          </div>
  );
}

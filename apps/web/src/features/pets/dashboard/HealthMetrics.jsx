export default function HealthMetrics({ metrics }) {
  const {
    currentTemp,
    tempDiff,
    weightDiff,
    vitalHistory,
    currentWeight,
    currentPet,
    completionRate,
    checklistItems,
    completedCount,
    nextReminder,
    getDDay
  } = metrics;
  return (
    <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginBottom: '26px'
        }}>
          {/* KPI 1: 체온 */}
          <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '22px 24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b' }}>최근 체온</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  color: currentTemp && (parseFloat(currentTemp) >= 37.5 && parseFloat(currentTemp) <= 39.2) ? '#059669' : '#d97706',
                  background: currentTemp && (parseFloat(currentTemp) >= 37.5 && parseFloat(currentTemp) <= 39.2) ? '#ecfdf5' : '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  {currentTemp ? (parseFloat(currentTemp) >= 37.5 && parseFloat(currentTemp) <= 39.2 ? '정상 모니터링' : '체온 주의') : '기록 필요'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#0b0f19', letterSpacing: '-0.8px' }}>
                  {currentTemp || '-'}
                </span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#64748b' }}>°C</span>
              </div>
            </div>
            <div style={{ marginTop: '14px' }}>
              <div style={{ height: '5px', width: '100%', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  height: '100%',
                  width: currentTemp ? `${Math.min(100, Math.max(10, ((parseFloat(currentTemp) - 35) / 6) * 100))}%` : '50%',
                  background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)',
                  borderRadius: '9999px'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '5px', fontWeight: '600' }}>
                <span>{tempDiff !== null ? `변화 곡선 반영 (${tempDiff >= 0 ? '+' : ''}${tempDiff}°C)` : '정상치 37.5°C'}</span>
                <span>39.0°C</span>
              </div>
            </div>
          </div>

          {/* KPI 2: 체중 */}
          <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '22px 24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b' }}>최근 체중</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#047857', background: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px' }}>
                  {weightDiff !== null ? `변화 곡선 (${weightDiff >= 0 ? '+' : ''}${weightDiff}kg)` : (vitalHistory.length >= 2 ? '변화 추적 중' : '기초 등록')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#059669', letterSpacing: '-0.8px' }}>
                  {currentWeight || '-'}
                </span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#059669' }}>kg</span>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginTop: '14px', background: '#f8fafc', padding: '6px 10px', borderRadius: '10px' }}>
              ⚖️ {currentPet?.breed || '반려동물'} 기준 체중 관리 권장
            </div>
          </div>

          {/* KPI 3: 데일리 케어 실천율 */}
          <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '22px 24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', marginBottom: '10px' }}>
                오늘 케어 실천
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', letterSpacing: '-0.8px' }}>
                  {completionRate}
                </span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb' }}>%</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginTop: '6px' }}>
                {checklistItems.length}개 중 {completedCount}개 완료
              </div>
            </div>

            {/* SVG Circular Progress Ring */}
            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="23" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="5"
                  strokeDasharray="144.5"
                  strokeDashoffset={144.5 - (144.5 * completionRate) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 28 28)"
                  style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                🎯
              </div>
            </div>
          </div>

          {/* KPI 4: 다음 케어 D-Day */}
          <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '22px 24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b' }}>다음 케어 D-Day</span>
                <span style={{ fontSize: '18px' }}>⏰</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '900', color: nextReminder ? '#db2777' : '#94a3b8', letterSpacing: '-0.8px' }}>
                {nextReminder ? getDDay(nextReminder.targetDate) : '일정 없음'}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nextReminder ? `${nextReminder.icon || '💊'} ${nextReminder.title}` : '새 일정을 등록하세요'}
            </div>
          </div>
        </div>
  );
}

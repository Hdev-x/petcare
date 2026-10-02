export default function VitalHistoryChart({ history }) {
  const {
    handleOpenBulkModal,
    handleOpenAddLog,
    vitalHistory,
    setChartMetric,
    chartMetric
  } = history;
  return (
    <div className="card-hover-lift" style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          padding: '28px 32px',
          border: '1px solid rgba(226, 232, 240, 0.85)',
          boxShadow: '0 10px 35px -10px rgba(15, 23, 42, 0.05)',
          marginBottom: '26px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(226, 232, 240, 0.7)', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                border: '1px solid #bfdbfe'
              }}>
                📈
              </div>
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                  체중 & 체온 변화 추이
                </h3>
                <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '500' }}>
                  일자별 측정 기록 시각화 및 정상 범위 모니터링
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleOpenBulkModal}
                className="card-hover-lift"
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  background: '#ecfdf5',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  color: '#047857',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span>📋</span>
                <span>기록 전체 일괄 편집</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddLog}
                className="card-hover-lift"
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  background: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: '#2563eb',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
                }}
              >
                + 빠른 기록
              </button>
            </div>
          </div>

          {/* Chart or Pure Empty State */}
          {vitalHistory && vitalHistory.length >= 1 ? (
            <div>
              <div style={{ background: '#fafbfc', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '18px 20px 14px 20px', marginBottom: '16px' }}>

                {/* Metric Selector & Legend Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: '4px', background: 'rgba(241, 245, 249, 0.9)', padding: '3px', borderRadius: '9999px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                    {[
                      { id: 'all', label: '전체 듀얼 뷰', icon: '📈' },
                      { id: 'weight', label: '몸무게만', icon: '⚖️' },
                      { id: 'temp', label: '체온만', icon: '🌡️' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setChartMetric(tab.id)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '9999px',
                          border: 'none',
                          background: chartMetric === tab.id ? '#ffffff' : 'transparent',
                          color: chartMetric === tab.id ? '#0b0f19' : '#64748b',
                          fontSize: '11.5px',
                          fontWeight: chartMetric === tab.id ? '800' : '600',
                          cursor: 'pointer',
                          boxShadow: chartMetric === tab.id ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Legends */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11.5px', fontWeight: '700' }}>
                    {(chartMetric === 'all' || chartMetric === 'weight') && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669', display: 'inline-block' }}></span>
                        <span style={{ color: '#047857' }}>체중 (kg)</span>
                      </div>
                    )}
                    {(chartMetric === 'all' || chartMetric === 'temp') && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                        <span style={{ color: '#b45309' }}>체온 (°C)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SVG Visual Chart */}
                <svg viewBox="0 0 520 130" style={{ width: '100%', height: '140px', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="20" y1="24" x2="500" y2="24" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="20" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="20" y1="96" x2="500" y2="96" stroke="#f1f5f9" strokeDasharray="3 3" />

                  {(() => {
                    const count = vitalHistory.length;

                    // 1. Weight calculation
                    const rawWeights = vitalHistory.map(h => parseFloat(h.weight) || 0).filter(v => v > 0);
                    const minW = rawWeights.length > 0 ? Math.min(...rawWeights) - 0.2 : 0;
                    const maxW = rawWeights.length > 0 ? Math.max(...rawWeights) + 0.2 : 10;
                    const rangeW = maxW - minW || 1;

                    const pointsW = vitalHistory.map((item, idx) => {
                      const w = parseFloat(item.weight) || minW;
                      const x = count === 1 ? 260 : 30 + (idx * (460 / (count - 1)));
                      const y = count === 1 ? (chartMetric === 'all' ? 50 : 60) : (90 - ((w - minW) / rangeW) * 65);
                      return { x, y, val: item.weight, date: item.date };
                    });

                    // 2. Temperature calculation
                    const rawTemps = vitalHistory.map(h => parseFloat(h.temp) || 0).filter(v => v > 0);
                    const minT = rawTemps.length > 0 ? Math.min(...rawTemps) - 0.2 : 36.5;
                    const maxT = rawTemps.length > 0 ? Math.max(...rawTemps) + 0.2 : 40.0;
                    const rangeT = maxT - minT || 1;

                    const pointsT = vitalHistory.map((item, idx) => {
                      const t = parseFloat(item.temp) || minT;
                      const x = count === 1 ? 260 : 30 + (idx * (460 / (count - 1)));
                      const y = count === 1 ? (chartMetric === 'all' ? 76 : 60) : (90 - ((t - minT) / rangeT) * 65);
                      return { x, y, val: item.temp || '-', date: item.date };
                    });

                    const pathStrW = pointsW.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                    const areaStrW = count > 1 ? `${pathStrW} L ${pointsW[count - 1].x} 100 L ${pointsW[0].x} 100 Z` : '';

                    const pathStrT = pointsT.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                    const areaStrT = count > 1 ? `${pathStrT} L ${pointsT[count - 1].x} 100 L ${pointsT[0].x} 100 Z` : '';

                    return (
                      <g>
                        {/* Single Point Vertical Baseline */}
                        {count === 1 && (
                          <line x1="260" y1="20" x2="260" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                        )}

                        {/* Weight Area & Line */}
                        {(chartMetric === 'all' || chartMetric === 'weight') && (
                          <g>
                            {count > 1 && <path d={areaStrW} fill="url(#weightAreaGrad)" />}
                            {count > 1 && (
                              <path d={pathStrW} fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                            {pointsW.map((p, i) => (
                              <g key={`w-${i}`}>
                                <circle cx={p.x} cy={p.y} r="5.5" fill="#ffffff" stroke="#059669" strokeWidth="3" />
                                <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10.5" fill="#047857" fontWeight="bold">
                                  {p.val}kg
                                </text>
                              </g>
                            ))}
                          </g>
                        )}

                        {/* Temperature Area & Line */}
                        {(chartMetric === 'all' || chartMetric === 'temp') && (
                          <g>
                            {count > 1 && <path d={areaStrT} fill="url(#tempAreaGrad)" />}
                            {count > 1 && (
                              <path
                                d={pathStrT}
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="2.8"
                                strokeDasharray={chartMetric === 'all' ? '5 3' : 'none'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {pointsT.map((p, i) => (
                              <g key={`t-${i}`}>
                                <circle cx={p.x} cy={p.y} r="5.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
                                <text x={p.x} y={p.y + 16} textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="bold">
                                  {p.val}°C
                                </text>
                              </g>
                            ))}
                          </g>
                        )}

                        {/* Date X-Axis Labels */}
                        {pointsW.map((p, i) => (
                          <text key={`date-${i}`} x={p.x} y={125} textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontWeight="600">
                            {p.date}
                          </text>
                        ))}
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(248, 250, 252, 0.8)', padding: '12px 18px', borderRadius: '16px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  <strong style={{ color: '#047857' }}>총 {vitalHistory.length}건 기록됨</strong>
                  <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
                  <span>최근 측정: {vitalHistory[vitalHistory.length - 1]?.date} (체중 {vitalHistory[vitalHistory.length - 1]?.weight}kg / 체온 {vitalHistory[vitalHistory.length - 1]?.temp || '-'}°C)</span>
                  {vitalHistory.length === 1 && (
                    <span style={{ marginLeft: '10px', fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>
                      (💡 일자를 2건 이상 입력하시면 변화 추이 곡선이 연결됩니다)
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleOpenBulkModal}
                  style={{ border: 'none', background: 'transparent', color: '#2563eb', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer' }}
                >
                  전체 기록 표로 수정하기 ➔
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fafbfc', borderRadius: '22px', border: '1px dashed #cbd5e1', padding: '44px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
              <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#0b0f19', margin: '0 0 6px 0' }}>
                등록된 체중 및 체온 측정치가 없습니다
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: '1.55' }}>
                측정 기록을 남기시면 일자별 곡선 그래프가 자동으로 그려집니다. 상단의 [기록 전체 일괄 편집]으로 여러 날짜를 한 번에 입력할 수도 있습니다.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleOpenBulkModal}
                  className="card-hover-lift"
                  style={{
                    padding: '9px 22px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)'
                  }}
                >
                  📋 기록 테이블로 입력하기
                </button>
              </div>
            </div>
          )}
        </div>
  );
}

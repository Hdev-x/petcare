export function VitalRecordModal({ records }) {
  const {
    showAddLogModal,
    editingLogIndex,
    setShowAddLogModal,
    setEditingLogIndex,
    handleSaveVitalRecord,
    newLog,
    setNewLog
  } = records;
  return (
    <>
      {showAddLogModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(11, 15, 25, 0.45)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="fade-in" style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '32px 28px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 25px 60px -15px rgba(11, 15, 25, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{editingLogIndex !== null ? '✏️' : '📈'}</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                    {editingLogIndex !== null ? '체중 & 체온 측정치 수정' : '체중 & 체온 측정치 기록'}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {editingLogIndex !== null ? '이전 측정 데이터를 정정합니다.' : '반려동물의 새로운 건강 지표를 기록합니다.'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddLogModal(false);
                  setEditingLogIndex(null);
                }}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVitalRecord} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  몸무게 (kg)
                </label>
                <input
                  type="number"
                  step="0.05"
                  required
                  placeholder="예: 3.5"
                  value={newLog.weight}
                  onChange={(e) => setNewLog({ ...newLog, weight: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  체온 (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="예: 38.5"
                  value={newLog.temp}
                  onChange={(e) => setNewLog({ ...newLog, temp: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px', display: 'block' }}>💡 정상 체온 범위: 37.5 ~ 39.0°C</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  측정 일자 (선택)
                </label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddLogModal(false);
                    setEditingLogIndex(null);
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#64748b', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="card-hover-lift"
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)'
                  }}
                >
                  {editingLogIndex !== null ? '💾 수정 내용 저장' : '📈 차트에 추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function BulkVitalRecordModal({ records }) {
  const {
    showBulkModal,
    setShowBulkModal,
    handleSaveBulkRecords,
    bulkRecords,
    handleUpdateBulkRow,
    handleDeleteBulkRow,
    handleAddBulkRow
  } = records;
  return (
    <>
      {showBulkModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(11, 15, 25, 0.45)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="fade-in" style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '32px 28px',
            width: '100%',
            maxWidth: '540px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px -15px rgba(11, 15, 25, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>📋</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                    체중 & 체온 전체 일괄 편집
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    과거 및 현재 측정 기록을 표에서 한 번에 수정하거나 추가할 수 있습니다.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Table Area */}
            <form onSubmit={handleSaveBulkRecords} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '10px 8px', color: '#475569', fontWeight: '800', width: '34%' }}>측정 일자</th>
                      <th style={{ padding: '10px 8px', color: '#059669', fontWeight: '800', width: '28%' }}>몸무게 (kg)</th>
                      <th style={{ padding: '10px 8px', color: '#f59e0b', fontWeight: '800', width: '28%' }}>체온 (°C)</th>
                      <th style={{ padding: '10px 8px', color: '#94a3b8', fontWeight: '800', width: '10%', textAlign: 'center' }}>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkRecords && bulkRecords.length > 0 ? (
                      bulkRecords.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px 6px' }}>
                            <input
                              type="text"
                              required
                              value={row.date}
                              onChange={(e) => handleUpdateBulkRow(idx, 'date', e.target.value)}
                              placeholder="09/03"
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                outline: 'none',
                                background: '#f8fafc',
                                boxSizing: 'border-box'
                              }}
                            />
                          </td>
                          <td style={{ padding: '8px 6px' }}>
                            <input
                              type="number"
                              step="0.05"
                              value={row.weight}
                              onChange={(e) => handleUpdateBulkRow(idx, 'weight', e.target.value)}
                              placeholder="예: 3.8"
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                outline: 'none',
                                background: '#f8fafc',
                                boxSizing: 'border-box',
                                fontWeight: '700',
                                color: '#059669'
                              }}
                            />
                          </td>
                          <td style={{ padding: '8px 6px' }}>
                            <input
                              type="number"
                              step="0.1"
                              value={row.temp}
                              onChange={(e) => handleUpdateBulkRow(idx, 'temp', e.target.value)}
                              placeholder="예: 38.5"
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                outline: 'none',
                                background: '#f8fafc',
                                boxSizing: 'border-box',
                                fontWeight: '700',
                                color: '#f59e0b'
                              }}
                            />
                          </td>
                          <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteBulkRow(idx)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#e11d48',
                                cursor: 'pointer',
                                fontSize: '16px',
                                padding: '4px'
                              }}
                              title="이 행 삭제"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                          측정 기록이 없습니다. 아래 버튼으로 행을 추가하세요.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Add Row Button */}
                <div style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleAddBulkRow}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '12px',
                      border: '1.5px dashed #cbd5e1',
                      background: '#f8fafc',
                      color: '#047857',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    + 새 측정치 행 추가하기
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '14px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#64748b',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="card-hover-lift"
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)'
                  }}
                >
                  💾 전체 변경사항 저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
